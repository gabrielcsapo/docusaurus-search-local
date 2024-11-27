import { ValidationResult, ValidationSchema } from '@docusaurus/types';
import type { PluginOptions } from 'docusaurus-plugin-search-local';
import { validateOptions } from './options';

describe('validateOptions', () => {
  const defaultTranslations = {
    search_placeholder: 'Search',
    see_all_results: 'See all results',
    no_results: 'No results.',
    search_results_for: 'Search results for "{{ keyword }}"',
    search_the_documentation: 'Search the documentation',
    count_documents_found: '{{ count }} document found',
    count_documents_found_plural: '{{ count }} documents found',
    no_documents_were_found: 'No documents were found',
  };

  function validate(
    schema: ValidationSchema<PluginOptions>,
    options: Partial<PluginOptions>,
  ): ValidationResult<PluginOptions> {
    const { error, value } = schema.validate(options, {
      convert: false,
    });
    if (error) {
      throw error;
    }
    return value;
  }

  test.each<[Partial<PluginOptions>, Omit<PluginOptions, 'id'>]>([
    [
      {},
      {
        blogRouteBasePath: ['blog'],
        blogDir: ['blog'],
        docsRouteBasePath: ['docs'],
        docsDir: ['docs'],
        hashed: false,
        indexBlog: true,
        indexDocs: true,
        indexPages: false,
        removeDefaultStopWordFilter: false,
        highlightSearchTermsOnTargetPage: false,
        searchResultLimits: 5,
        searchResultContextMaxLength: 50,
        ignoreFiles: [],
        translations: defaultTranslations,
        externalSearchSources: [],
      },
    ],
    [
      { ignoreFiles: 'file1' },
      {
        blogRouteBasePath: ['blog'],
        blogDir: ['blog'],
        docsRouteBasePath: ['docs'],
        docsDir: ['docs'],
        hashed: false,
        indexBlog: true,
        indexDocs: true,
        indexPages: false,
        removeDefaultStopWordFilter: false,
        highlightSearchTermsOnTargetPage: false,
        searchResultLimits: 5,
        searchResultContextMaxLength: 50,
        ignoreFiles: 'file1',
        translations: defaultTranslations,
        externalSearchSources: [],
      },
    ],
    [
      { ignoreFiles: [/__meta__$/, 'file1'] },
      {
        blogRouteBasePath: ['blog'],
        blogDir: ['blog'],
        docsRouteBasePath: ['docs'],
        docsDir: ['docs'],
        hashed: false,
        indexBlog: true,
        indexDocs: true,
        indexPages: false,
        removeDefaultStopWordFilter: false,
        highlightSearchTermsOnTargetPage: false,
        searchResultLimits: 5,
        searchResultContextMaxLength: 50,
        ignoreFiles: [/__meta__$/, 'file1'],
        translations: defaultTranslations,
        externalSearchSources: [],
      },
    ],
    [
      {
        docsDir: 'src/docs',
        blogDir: 'src/blog',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 5,
        searchResultContextMaxLength: 30,
      },
      {
        blogRouteBasePath: ['blog'],
        blogDir: 'src/blog',
        docsRouteBasePath: ['docs'],
        docsDir: 'src/docs',
        hashed: false,
        indexBlog: true,
        indexDocs: true,
        indexPages: false,
        removeDefaultStopWordFilter: false,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 5,
        searchResultContextMaxLength: 30,
        ignoreFiles: [],
        translations: defaultTranslations,
        externalSearchSources: [],
      },
    ],
    [
      {
        docsRouteBasePath: '/dev/docs',
        blogRouteBasePath: '/dev/blog',
      },
      {
        blogRouteBasePath: '/dev/blog',
        blogDir: ['blog'],
        docsRouteBasePath: '/dev/docs',
        docsDir: ['docs'],
        hashed: false,
        indexBlog: true,
        indexDocs: true,
        indexPages: false,
        removeDefaultStopWordFilter: false,
        highlightSearchTermsOnTargetPage: false,
        searchResultLimits: 5,
        searchResultContextMaxLength: 50,
        ignoreFiles: [],
        translations: defaultTranslations,
        externalSearchSources: [],
      },
    ],
    [
      {
        docsRouteBasePath: ['/dev/docs'],
        blogRouteBasePath: ['/dev/blog'],
      },
      {
        blogRouteBasePath: ['/dev/blog'],
        blogDir: ['blog'],
        docsRouteBasePath: ['/dev/docs'],
        docsDir: ['docs'],
        hashed: false,
        indexBlog: true,
        indexDocs: true,
        indexPages: false,
        removeDefaultStopWordFilter: false,
        highlightSearchTermsOnTargetPage: false,
        searchResultLimits: 5,
        searchResultContextMaxLength: 50,
        ignoreFiles: [],
        translations: defaultTranslations,
        externalSearchSources: [],
      },
    ],
    [
      {
        translations: {
          search_placeholder: '搜索',
          see_all_results: '查看全部结果',
          no_results: '没有找到任何文档。',
          search_results_for: '搜索 “{{ keyword }}”',
          search_the_documentation: '搜索文档',
          count_documents_found: '共找到 {{ count }} 篇文档',
          count_documents_found_plural: '共找到 {{ count }} 篇文档',
          no_documents_were_found: '没有找到任何文档',
        },
      },
      {
        blogRouteBasePath: ['blog'],
        blogDir: ['blog'],
        docsRouteBasePath: ['docs'],
        docsDir: ['docs'],
        hashed: false,
        indexBlog: true,
        indexDocs: true,
        indexPages: false,
        removeDefaultStopWordFilter: false,
        highlightSearchTermsOnTargetPage: false,
        searchResultLimits: 5,
        searchResultContextMaxLength: 50,
        ignoreFiles: [],
        translations: {
          search_placeholder: '搜索',
          see_all_results: '查看全部结果',
          no_results: '没有找到任何文档。',
          search_results_for: '搜索 “{{ keyword }}”',
          search_the_documentation: '搜索文档',
          count_documents_found: '共找到 {{ count }} 篇文档',
          count_documents_found_plural: '共找到 {{ count }} 篇文档',
          no_documents_were_found: '没有找到任何文档',
        },
        externalSearchSources: [],
      },
    ],
    [
      {
        translations: {
          search_placeholder: '搜索',
          see_all_results: '查看全部结果',
          no_results: '没有找到任何文档。',
          search_results_for: '搜索 “{{ keyword }}”',
          search_the_documentation: '搜索文档',
          count_documents_found: '共找到一篇文档',
          // Explicitly override `*_plural`.
          count_documents_found_plural: '共找到 {{ count }} 篇文档',
          no_documents_were_found: '没有找到任何文档',
        },
      },
      {
        blogRouteBasePath: ['blog'],
        blogDir: ['blog'],
        docsRouteBasePath: ['docs'],
        docsDir: ['docs'],
        hashed: false,
        indexBlog: true,
        indexDocs: true,
        indexPages: false,
        removeDefaultStopWordFilter: false,
        highlightSearchTermsOnTargetPage: false,
        searchResultLimits: 5,
        searchResultContextMaxLength: 50,
        ignoreFiles: [],
        translations: {
          search_placeholder: '搜索',
          see_all_results: '查看全部结果',
          no_results: '没有找到任何文档。',
          search_results_for: '搜索 “{{ keyword }}”',
          search_the_documentation: '搜索文档',
          count_documents_found: '共找到一篇文档',
          count_documents_found_plural: '共找到 {{ count }} 篇文档',
          no_documents_were_found: '没有找到任何文档',
        },
        externalSearchSources: [],
      },
    ],
  ])('validateOptions(...) should work', (options, config) => {
    expect(validateOptions({ options, validate })).toEqual(config);
  });
});
