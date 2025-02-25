/**
 * [GET] Get Category
 * @description Retrieve detailed data of a category by it's ID
 */
export interface GetCategory {
  request: {
    params: {
      id: string;
    };
    search_params: null;
    body: null;
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      id: string;
      slug: string;
      name: {
        eng: string | null;
        ind: string | null;
      };
      description: {
        eng: string | null;
        ind: string | null;
      };
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
  };
}

/**
 * [GET] Get Categories
 * @description Retrieve list of category
 */
export interface GetCategories {
  request: {
    params: null;
    search_params: {
      page: string | null;
      limit: string | null;
      name: string | null;
      slug: string | null;
    };
    body: null;
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      list: Array<{
        id: string;
        slug: string;
        name: {
          eng: string | null;
          ind: string | null;
        };
      }>;
      total: number;
    };
  };
}

/**
 * [GET] Get Category options
 * @description Retrieve simpler list of category based on it's name
 */
export interface GetCategoryOptions {
  request: {
    params: null;
    search_params: {
      name: string | null;
    };
    body: null;
  };
  response: {
    success: boolean;
    message: string | null;
    data: Array<{
      id: string;
      name: string;
    }>;
  };
}

/**
 * [POST] Add Category
 * @description Create new category according to request body
 */
export interface AddCategory {
  request: {
    params: null;
    search_params: null;
    body: {
      name: {
        eng: string;
        ind: string;
      };
      slug: string;
      description: {
        eng: string | null;
        ind: string | null;
      };
    };
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      id: string;
      slug: string;
      name: {
        eng: string | null;
        ind: string | null;
      };
      description: {
        eng: string | null;
        ind: string | null;
      };
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
    fields?: string[];
  };
}

/**
 * [PUT] Edit Category
 * @description Update category data according to request body
 */
export interface EditCategory {
  request: {
    params: {
      id: string;
    };
    search_params: null;
    body: {
      name: {
        eng: string | null;
        ind: string | null;
      };
      slug: string | null;
      description: {
        eng: string | null;
        ind: string | null;
      };
    };
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      id: string;
      slug: string;
      name: {
        eng: string | null;
        ind: string | null;
      };
      description: {
        eng: string | null;
        ind: string | null;
      };
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
    fields?: string[];
  };
}

/**
 * [DELETE] Remove Category
 * @description Delete category by it's ID
 */
export interface RemoveCategory {
  request: {
    params: {
      id: string;
    };
    search_params: null;
    body: null;
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      id: string;
      slug: string;
      name: {
        eng: string | null;
        ind: string | null;
      };
      description: {
        eng: string | null;
        ind: string | null;
      };
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
  };
}
