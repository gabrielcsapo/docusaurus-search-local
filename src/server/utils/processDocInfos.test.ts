import { describe, test, expect } from 'vitest';
import { DocusaurusConfig, Props as PostBuildData } from '@docusaurus/types';
import { DocInfoWithFilePath, PluginConfig } from '../../types';
import { processDocInfos } from './processDocInfos';

describe('processDocInfos', () => {
  const DEFAULT_POST_BUILD_DATA_FIELDS: PostBuildData = {
    routesPaths: [],
    outDir: '',
    baseUrl: '',
    siteConfig: {} as DocusaurusConfig,
    codeTranslations: {},
    generatedFilesDir: '',
    headTags: '',
    i18n: {
      currentLocale: '',
      defaultLocale: '',
      localeConfigs: {},
      locales: [''],
    },
    plugins: [],
    postBodyTags: '',
    preBodyTags: '',
    routes: [],
    siteConfigPath: '',
    siteDir: '',
    siteMetadata: {
      docusaurusVersion: '',
      pluginVersions: {},
    },
    ssrTemplate: '',
  };
  describe('trailingSlash defaults to undefined', () => {
    const routesPaths: string[] = [
      '/base/',
      '/base/docs/a',
      '/base/blog',
      '/base/blog/tags',
      '/base/blog/b',
      '/base/404.html',
      '/base/search',
      '/base/page',
      '/base/__meta__.md',
      '/base/file.md',
    ];
    const buildData: PostBuildData = {
      ...DEFAULT_POST_BUILD_DATA_FIELDS,
      routesPaths,
      outDir: '/build',
      baseUrl: '/base/',
      siteConfig: {} as DocusaurusConfig,
    };
    test.each<[Partial<PluginConfig>, DocInfoWithFilePath[]]>([
      [
        {
          indexDocs: false,
          indexBlog: false,
          indexPages: false,
          ignoreFiles: [],
        },
        [],
      ],
      [
        {
          indexDocs: true,
          indexBlog: true,
          indexPages: true,
          docsRouteBasePath: ['docs'],
          blogRouteBasePath: ['blog'],
          ignoreFiles: [/^__meta__/, 'file.md'],
        },
        [
          {
            filePath: '/build/docs/a/index.html',
            type: 'docs',
            url: '/base/docs/a',
          },
          {
            filePath: '/build/blog/b/index.html',
            type: 'blog',
            url: '/base/blog/b',
          },
          {
            filePath: '/build/page/index.html',
            type: 'page',
            url: '/base/page',
          },
        ],
      ],
    ])('processDocInfos(...) should work', (config, result) => {
      expect(processDocInfos(buildData, config as PluginConfig)).toEqual(
        result,
      );
    });
  });

  describe('trailingSlash set to false', () => {
    const routesPaths: string[] = [
      '/base/',
      '/base/docs/a',
      '/base/blog',
      '/base/blog/tags',
      '/base/blog/b',
      '/base/404.html',
      '/base/search',
      '/base/page',
      '/base/__meta__.md',
      '/base/file.md',
    ];
    const buildData: PostBuildData = {
      ...DEFAULT_POST_BUILD_DATA_FIELDS,
      routesPaths,
      outDir: '/build',
      baseUrl: '/base/',
      siteConfig: {
        trailingSlash: false,
      } as DocusaurusConfig,
    };
    test.each<[Partial<PluginConfig>, DocInfoWithFilePath[]]>([
      [
        {
          indexDocs: false,
          indexBlog: false,
          indexPages: false,
          ignoreFiles: [],
        },
        [],
      ],
      [
        {
          indexDocs: true,
          indexBlog: true,
          indexPages: true,
          docsRouteBasePath: ['docs'],
          blogRouteBasePath: ['blog'],
          ignoreFiles: [/^__meta__/, 'file.md'],
        },
        [
          {
            filePath: '/build/docs/a.html',
            type: 'docs',
            url: '/base/docs/a',
          },
          {
            filePath: '/build/blog/b.html',
            type: 'blog',
            url: '/base/blog/b',
          },
          {
            filePath: '/build/page.html',
            type: 'page',
            url: '/base/page',
          },
        ],
      ],
    ])('processDocInfos(...) should work', (config, result) => {
      expect(processDocInfos(buildData, config as PluginConfig)).toEqual(
        result,
      );
    });
  });

  describe('trailingSlash set to true', () => {
    const routesPaths: string[] = [
      '/base/',
      '/base/docs/a/',
      '/base/blog/',
      '/base/blog/tags/',
      '/base/blog/b/',
      '/base/404.html',
      '/base/page/',
      '/base/search',
      '/base/__meta__.md',
      '/base/file.md',
    ];
    const buildData: PostBuildData = {
      ...DEFAULT_POST_BUILD_DATA_FIELDS,
      routesPaths,
      outDir: '/build',
      baseUrl: '/base/',
      siteConfig: {
        trailingSlash: true,
      } as DocusaurusConfig,
    };
    test.each<[Partial<PluginConfig>, DocInfoWithFilePath[]]>([
      [
        {
          indexDocs: false,
          indexBlog: false,
          indexPages: false,
          ignoreFiles: [],
        },
        [],
      ],
      [
        {
          indexDocs: true,
          indexBlog: true,
          indexPages: true,
          docsRouteBasePath: ['docs'],
          blogRouteBasePath: ['blog'],
          ignoreFiles: [/^__meta__/, 'file.md'],
        },
        [
          {
            filePath: '/build/docs/a/index.html',
            type: 'docs',
            url: '/base/docs/a/',
          },
          {
            filePath: '/build/blog/b/index.html',
            type: 'blog',
            url: '/base/blog/b/',
          },
          {
            filePath: '/build/page/index.html',
            type: 'page',
            url: '/base/page/',
          },
        ],
      ],
    ])('processDocInfos(...) should work', (config, result) => {
      expect(processDocInfos(buildData, config as PluginConfig)).toEqual(
        result,
      );
    });
  });

  describe('docs base path set to root', () => {
    const routesPaths: string[] = [
      '/base/',
      '/base/docs-a',
      '/base/docs-b/c',
      '/base/404.html',
      '/base/search',
      '/base/page',
    ];
    const buildData: PostBuildData = {
      ...DEFAULT_POST_BUILD_DATA_FIELDS,
      routesPaths,
      outDir: '/build',
      baseUrl: '/base/',
      siteConfig: {} as DocusaurusConfig,
    };
    test.each<[Partial<PluginConfig>, DocInfoWithFilePath[]]>([
      [
        {
          indexDocs: true,
          indexBlog: false,
          indexPages: false,
          docsRouteBasePath: [''],
          blogRouteBasePath: ['blog'],
        },
        [
          {
            filePath: '/build/docs-a/index.html',
            type: 'docs',
            url: '/base/docs-a',
          },
          {
            filePath: '/build/docs-b/c/index.html',
            type: 'docs',
            url: '/base/docs-b/c',
          },
          {
            filePath: '/build/page/index.html',
            type: 'docs',
            url: '/base/page',
          },
        ],
      ],
    ])('processDocInfos(...) should work', (config, result) => {
      expect(processDocInfos(buildData, config as PluginConfig)).toEqual(
        result,
      );
    });
  });

  describe('blog base path set to root', () => {
    const routesPaths: string[] = [
      '/base/',
      '/base/blog-a',
      '/base/blog-b/c',
      '/base/404.html',
      '/base/search',
      '/base/page',
    ];
    const buildData: PostBuildData = {
      ...DEFAULT_POST_BUILD_DATA_FIELDS,
      routesPaths,
      outDir: '/build',
      baseUrl: '/base/',
      siteConfig: {} as DocusaurusConfig,
    };
    test.each<[Partial<PluginConfig>, DocInfoWithFilePath[]]>([
      [
        {
          indexDocs: false,
          indexBlog: true,
          indexPages: false,
          docsRouteBasePath: ['docs'],
          blogRouteBasePath: [''],
        },
        [
          {
            filePath: '/build/blog-a/index.html',
            type: 'blog',
            url: '/base/blog-a',
          },
          {
            filePath: '/build/blog-b/c/index.html',
            type: 'blog',
            url: '/base/blog-b/c',
          },
          {
            filePath: '/build/page/index.html',
            type: 'blog',
            url: '/base/page',
          },
        ],
      ],
    ])('processDocInfos(...) should work', (config, result) => {
      expect(processDocInfos(buildData, config as PluginConfig)).toEqual(
        result,
      );
    });
  });
});
