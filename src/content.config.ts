import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const flickrAlbumSchema = z.object({
  href: z.string().url(),
  preview_src: z.string().url(),
  embed_title: z.string().optional(),
  preview_width: z.number().optional(),
  preview_height: z.number().optional(),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    flickr_album: flickrAlbumSchema.optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    showcase: z.boolean().optional(),
    related_links: z
      .array(
        z.object({
          title: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    event_date: z.coerce.date(),
    end_date: z.coerce.date().optional(),
    location: z.string().optional(),
    registration_url: z.string().optional(),
  }),
});

export const collections = { news, articles, events };
