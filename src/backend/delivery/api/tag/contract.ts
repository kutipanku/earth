/**
 * [GET] Get Tag
 * @description Retrieve detailed data of a tag by it's ID
 */
export interface GetTag {
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
 * [GET] Get Tagss
 * @description Retrieve list of tag
 */
export interface GetTags {
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
    data: {
      list: Array<{
        id: string;
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
 * [GET] Get Tag options
 * @description Retrieve simpler list of tag based on it's name
 */
export interface GetTagOptions {
  request: {
    params: null;
    search_params: {
      name: string | null;
    };
    body: null;
  };
  response: {
    success: boolean;
    data: Array<{
      id: string;
      name: string;
    }>;
  };
}

/**
 * [POST] Add Tag
 * @description Create new tag according to request body
 */
export interface AddTag {
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
    response: {
      success: boolean;
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
  };
}

/**
 * [PUT] Edit Tag
 * @description Update tag data according to request body
 */
export interface EditTag {
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
 * [DELETE] Remove Tag
 * @description Delete tag by it's ID
 */
export interface RemoveTag {
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
      };
    } | null;
  };
}
