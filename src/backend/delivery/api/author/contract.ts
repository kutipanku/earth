/**
 * [GET] Get Author
 * @description Retrieve detailed data of an author by it's ID
 */
export interface GetAuthor {
  request: {
    params: {
      id: string;
    };
    search_params: null;
    body: null;
  };
  response: {
    data: {
      id: string;
      name: string;
      slug: string;
      description: {
        ind: string;
        eng: string;
      };
      dob: string;
      nationality: {
        id: string;
        name: string;
      } | null;
      profession: {
        id: string;
        name: string;
      } | null;
      metadata: {
        created_at: string;
        updated_at: string;
      };
      picture_url: string | null;
    } | null;
  };
}

/**
 * [GET] Get Authors
 * @description Retrieve list of author
 */
export interface GetAuthors {
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
    data: Array<{
      id: string;
      name: string;
      slug: string;
      nationality: {
        id: string;
        name: string;
      } | null;
      profession: {
        id: string;
        name: string;
      } | null;
    }>;
  };
}

/**
 * [GET] Get Author options
 * @description Retrieve simpler list of author based on it's name
 */
export interface GetAuthorOptions {
  request: {
    params: null;
    search_params: {
      name: string | null;
    };
    body: null;
  };
  response: {
    data: Array<{
      id: string;
      name: string;
    }>;
  };
}

/**
 * [POST] Add Author
 * @description Create new author according to request body
 */
export interface AddAuthor {
  request: {
    params: null;
    search_params: null;
    body: {
      name: string;
      slug: string;
      dob?: string;
      picture_url?: string;
      description?: {
        eng?: string;
        ind?: string;
      };
      nationality_id?: string;
      profession_id?: string;
    };
    response: {
      data: {
        id: string;
        name: string;
        slug: string;
        description: {
          ind: string;
          eng: string;
        };
        dob: string;
        nationality: {
          id: string;
          name: string;
        } | null;
        profession: {
          id: string;
          name: string;
        } | null;
        metadata: {
          created_at: string;
          updated_at: string;
        };
        picture_url: string | null;
      } | null;
    };
  };
}

/**
 * [PUT] Edit Author
 * @description Update author data according to request body
 * @requires id as parameter
 */
export interface EditAuthor {
  request: {
    params: null;
    search_params: null;
    body: {
      name: string;
      slug: string;
      dob?: string;
      picture_url?: string;
      description?: {
        eng?: string;
        ind?: string;
      };
      nationality_id?: string;
      profession_id?: string;
    };
  };
  response: {
    data: {
      id: string;
      name: string;
      slug: string;
      description: {
        ind: string;
        eng: string;
      };
      dob: string;
      nationality: {
        id: string;
        name: string;
      } | null;
      profession: {
        id: string;
        name: string;
      } | null;
      metadata: {
        created_at: string;
        updated_at: string;
      };
      picture_url: string | null;
    } | null;
  };
}

/**
 * [DELETE] Remove Author
 * @description Delete author by it's ID
 * @requires id as parameter
 */
export interface RemoveAuthor {
  request: {
    params: {
      id: string;
    };
    search_params: null;
    body: null;
  };
  response: {
    data: {
      id: string;
      name: string;
      slug: string;
      description: {
        ind: string;
        eng: string;
      };
      dob: string;
      nationality: {
        id: string;
        name: string;
      } | null;
      profession: {
        id: string;
        name: string;
      } | null;
      metadata: {
        created_at: string;
        updated_at: string;
      };
      picture_url: string | null;
    } | null;
  };
}
