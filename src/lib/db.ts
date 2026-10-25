import fs from 'fs';
import path from 'path';
import os from 'os';
import { DatabaseSchema } from '@/types/company';
import { initialDatabase } from './seedData';

declare global {
  // eslint-disable-next-line no-var
  var __companyDbCache: DatabaseSchema | undefined;
}

function getStoragePath(): string {
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    return path.join(os.tmpdir(), 'company_db.json');
  }
  const localDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(localDir)) {
    try {
      fs.mkdirSync(localDir, { recursive: true });
    } catch {
      return path.join(os.tmpdir(), 'company_db.json');
    }
  }
  return path.join(localDir, 'company_db.json');
}

export async function getDatabase(): Promise<DatabaseSchema> {
  const filePath = getStoragePath();

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw) as DatabaseSchema;
      if (
        parsed &&
        Array.isArray(parsed.user) &&
        Array.isArray(parsed.user_role) &&
        Array.isArray(parsed.user_menu) &&
        Array.isArray(parsed.user_access_menu) &&
        Array.isArray(parsed.user_sub_menu) &&
        Array.isArray(parsed.skills) &&
        Array.isArray(parsed.services)
      ) {
        if (Array.isArray(parsed.portfolio)) {
          parsed.portfolio = parsed.portfolio.map((p) => {
            const seedMatch = initialDatabase.portfolio.find((sp) => sp.id === p.id);
            return {
              ...p,
              link: p.link || seedMatch?.link || '/#portfolio'
            };
          });
        }
        parsed.company = {
          ...initialDatabase.company,
          ...parsed.company
        };
        if (!Array.isArray(parsed.aboutTabs)) {
          parsed.aboutTabs = JSON.parse(JSON.stringify(initialDatabase.aboutTabs));
        }
        if (!Array.isArray(parsed.simpusBooks)) {
          parsed.simpusBooks = JSON.parse(JSON.stringify(initialDatabase.simpusBooks));
        }
        if (!Array.isArray(parsed.pricing)) {
          parsed.pricing = JSON.parse(JSON.stringify(initialDatabase.pricing));
        }
        if (!Array.isArray(parsed.blogPosts)) {
          parsed.blogPosts = JSON.parse(JSON.stringify(initialDatabase.blogPosts));
        }
        if (!Array.isArray(parsed.features)) {
          parsed.features = JSON.parse(JSON.stringify(initialDatabase.features));
        }
        if (!Array.isArray(parsed.contactInfo)) {
          parsed.contactInfo = JSON.parse(JSON.stringify(initialDatabase.contactInfo));
        }
        if (!Array.isArray(parsed.heroSlides) || parsed.heroSlides.length === 0) {
          parsed.heroSlides = JSON.parse(JSON.stringify(initialDatabase.heroSlides));
        }
        globalThis.__companyDbCache = parsed;
        return parsed;
      }
    }
  } catch {
    // Fallback to memory cache or initial seed
  }

  if (
    globalThis.__companyDbCache &&
    Array.isArray(globalThis.__companyDbCache.user_menu) &&
    Array.isArray(globalThis.__companyDbCache.user_sub_menu) &&
    Array.isArray(globalThis.__companyDbCache.services)
  ) {
    globalThis.__companyDbCache.company = {
      ...initialDatabase.company,
      ...globalThis.__companyDbCache.company
    };
    if (!Array.isArray(globalThis.__companyDbCache.aboutTabs)) {
      globalThis.__companyDbCache.aboutTabs = JSON.parse(
        JSON.stringify(initialDatabase.aboutTabs)
      );
    }
    if (!Array.isArray(globalThis.__companyDbCache.simpusBooks)) {
      globalThis.__companyDbCache.simpusBooks = JSON.parse(
        JSON.stringify(initialDatabase.simpusBooks)
      );
    }
    return globalThis.__companyDbCache;
  }

  const cloned = JSON.parse(JSON.stringify(initialDatabase)) as DatabaseSchema;
  globalThis.__companyDbCache = cloned;

  try {
    fs.writeFileSync(filePath, JSON.stringify(cloned, null, 2), 'utf-8');
  } catch {
    // Ignore write error on read-only environments
  }

  return cloned;
}

export async function saveDatabase(data: DatabaseSchema): Promise<DatabaseSchema> {
  globalThis.__companyDbCache = data;
  const filePath = getStoragePath();

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Memory cache still holds the updated state
  }

  return data;
}

export async function resetDatabase(): Promise<DatabaseSchema> {
  const fresh = JSON.parse(JSON.stringify(initialDatabase)) as DatabaseSchema;
  return saveDatabase(fresh);
}

