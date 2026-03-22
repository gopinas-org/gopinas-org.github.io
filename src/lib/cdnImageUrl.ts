/**
 * Build resized/optimized delivery URLs for known CDNs. Unknown URLs are returned unchanged.
 * Add adapters in `adapters` for services with URL-based transforms (e.g. Imgix).
 */

export type ImageCrop = 'fill' | 'limit' | 'scale' | 'fit';

export type OptimizeImageOptions = {
  width: number;
  height?: number;
  crop?: ImageCrop;
};

export type ImageUrlAdapter = {
  id: string;
  match: (url: string) => boolean;
  optimize: (url: string, opts: OptimizeImageOptions) => string;
};

const TRANSFORM_KEY_RE =
  /^(w|h|c|f|q|g|e|b|d|o|t|a|l|so|ar|bo|bl|fl|fn|pg|du|dw|dy|sp)(_|\.)/i;

function isTransformSegment(segment: string): boolean {
  if (!segment) return false;
  if (segment.includes(',')) {
    return segment.split(',').every((p) => {
      const t = p.trim();
      return /^[a-z][a-z0-9]*[._][^,]+$/i.test(t);
    });
  }
  return TRANSFORM_KEY_RE.test(segment);
}

function splitCloudinaryUploadPath(pathAfterUpload: string): { transform: string | null; rest: string } {
  const segments = pathAfterUpload.split('/');
  if (segments.length === 0) return { transform: null, rest: pathAfterUpload };

  const [first, ...restParts] = segments;
  if (/^v\d+$/i.test(first)) {
    return { transform: null, rest: pathAfterUpload };
  }
  if (isTransformSegment(first)) {
    return { transform: first, rest: restParts.join('/') };
  }
  return { transform: null, rest: pathAfterUpload };
}

function mergeCloudinaryTransforms(existing: string | null, opts: OptimizeImageOptions): string {
  const crop = opts.crop ?? 'fill';
  const keep: string[] = [];
  if (existing) {
    for (const p of existing.split(',').map((s) => s.trim()).filter(Boolean)) {
      if (/^(w|h|c)_/i.test(p)) continue;
      if (/^f_auto$/i.test(p) || /^q_auto$/i.test(p)) continue;
      keep.push(p);
    }
  }
  const parts = [`c_${crop}`, `w_${opts.width}`];
  if (opts.height != null) parts.push(`h_${opts.height}`);
  parts.push('f_auto', 'q_auto');
  if (keep.length) parts.push(...keep);
  return parts.join(',');
}

function optimizeCloudinaryUrl(src: string, opts: OptimizeImageOptions): string {
  let parsed: URL;
  try {
    parsed = new URL(src);
  } catch {
    return src;
  }

  if (!parsed.hostname.endsWith('res.cloudinary.com')) return src;

  const m = parsed.pathname.match(/^(.+\/(?:image|video)\/upload\/)(.+)$/i);
  if (!m) return src;

  const prefix = m[1];
  const afterUpload = m[2];
  const { transform, rest } = splitCloudinaryUploadPath(afterUpload);
  const merged = mergeCloudinaryTransforms(transform, opts);
  parsed.pathname = `${prefix}${merged}/${rest}`;
  return parsed.toString();
}

function matchCloudinary(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname.endsWith('res.cloudinary.com') && /\/(image|video)\/upload\//i.test(u.pathname);
  } catch {
    return false;
  }
}

const cloudinaryAdapter: ImageUrlAdapter = {
  id: 'cloudinary',
  match: matchCloudinary,
  optimize: optimizeCloudinaryUrl,
};

/** Ordered list — first matching adapter wins. Register more via {@link registerImageUrlAdapter}. */
const adapters: ImageUrlAdapter[] = [cloudinaryAdapter];

/** Plug in another CDN (e.g. Imgix) without touching Cloudinary code. */
export function registerImageUrlAdapter(adapter: ImageUrlAdapter, prepend = true): void {
  if (prepend) adapters.unshift(adapter);
  else adapters.push(adapter);
}

export function isCloudinaryDeliveryUrl(url: string): boolean {
  return matchCloudinary(url);
}

/**
 * Returns a CDN-specific URL with requested dimensions when a matching adapter exists; otherwise `src`.
 */
export function optimizeImageUrl(src: string, opts: OptimizeImageOptions): string {
  for (const a of adapters) {
    if (a.match(src)) return a.optimize(src, opts);
  }
  return src;
}
