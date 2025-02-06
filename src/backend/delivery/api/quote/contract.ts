/**
 * [GET] Get Quote
 * @description Retrieve detailed data of an quote by it's ID
 */
export interface GetQuote {
  request: {
    params: {
      id: string;
    };
    search_params: null;
    body: null;
  };
  response: {
    success: boolean;
    data: {
      id: string;
      slug: string;
      content: {
        ind: string | null;
        eng: string | null;
      };
      description: {
        ind: string | null;
        eng: string | null;
      };
      url: {
        ind: string | null;
        eng: string | null;
      };
      author: {
        id: string;
        name: string;
      };
      category: {
        id: string;
        name: string;
      };
      tags: Array<{
        id: string;
        name: string;
      }>;
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
  };
}

/**
 * [GET] Get Quotes
 * @description Retrieve list of quote
 */
export interface GetQuotes {
  request: {
    params: null;
    search_params: {
      page: string | null;
      limit: string | null;
      filter_author: string | null;
      filter_content: string | null;
      filter_category: string | null;
      filter_tag: string | null;
    };
    body: null;
  };
  response: {
    success: boolean;
    data: {
      list: Array<{
        id: string;
        content: {
          ind: string | null;
          eng: string | null;
        };
        author: {
          id: string;
          name: string;
        };
        category: {
          id: string;
          name: string;
        };
        tags: Array<{
          id: string;
          name: string;
        }>;
      }>;
      total: number;
    };
  };
}

/**
 * [POST] Add Quote
 * @description Create new quote according to request body
 */
export interface AddQuote {
  request: {
    params: null;
    search_params: null;
    body: {
      slug: string;
      content?: {
        eng?: string;
        ind?: string;
      };
      description?: {
        eng?: string;
        ind?: string;
      };
      author_id?: string;
      category_id?: string;
      tags_id?: string;
    };
    response: {
      success: boolean;
      data: {
        id: string;
        slug: string;
        content: {
          ind: string | null;
          eng: string | null;
        };
        description: {
          ind: string | null;
          eng: string | null;
        };
        url: {
          ind: string | null;
          eng: string | null;
        };
        author: {
          id: string;
          name: string;
        };
        category: {
          id: string;
          name: string;
        };
        tags: Array<{
          id: string;
          name: string;
        }>;
        metadata: {
          created_at: string;
          updated_at: string;
        } | null;
      } | null;
    };
  };
}

/**
 * [PUT] Edit Quote
 * @description Update quote data according to request body
 * @requires id as parameter
 */
export interface EditQuote {
  request: {
    params: {
      id: string;
    };
    search_params: null;
    body: {
      slug: string;
      content?: {
        eng?: string;
        ind?: string;
      };
      description?: {
        eng?: string;
        ind?: string;
      };
      author_id?: string;
      category_id?: string;
      tags_id?: string;
    };
  };
  response: {
    success: boolean;
    data: {
      id: string;
      slug: string;
      content: {
        ind: string | null;
        eng: string | null;
      };
      description: {
        ind: string | null;
        eng: string | null;
      };
      url: {
        ind: string | null;
        eng: string | null;
      };
      author: {
        id: string;
        name: string;
      };
      category: {
        id: string;
        name: string;
      };
      tags: Array<{
        id: string;
        name: string;
      }>;
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
  };
}

/**
 * [DELETE] Remove Quote
 * @description Delete quote by it's ID
 * @requires id as parameter
 */
export interface RemoveQuote {
  request: {
    params: {
      id: string;
    };
    search_params: null;
    body: null;
  };
  response: {
    success: boolean;
    data: {
      id: string;
      slug: string;
      content: {
        ind: string | null;
        eng: string | null;
      };
      description: {
        ind: string | null;
        eng: string | null;
      };
      url: {
        ind: string | null;
        eng: string | null;
      };
      author: {
        id: string;
        name: string;
      };
      category: {
        id: string;
        name: string;
      };
      tags: Array<{
        id: string;
        name: string;
      }>;
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
  };
}
