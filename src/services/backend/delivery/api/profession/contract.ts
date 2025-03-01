/**
 * [GET] Get Profession
 * @description Retrieve detailed data of a profession by it's ID
 */
export interface GetProfession {
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
      icon: string | null;
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
  };
}

/**
 * [GET] Get Professions
 * @description Retrieve list of profession
 */
export interface GetProfessions {
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
        icon: string | null;
      }>;
      total: number;
    };
  };
}

/**
 * [GET] Get Profession Options
 * @description Retrieve simpler list of profession based on it's name
 */
export interface GetProfessionOptions {
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
 * [POST] Add Profession
 * @description Create new profession according to request body
 */
export interface AddProfession {
  request: {
    params: null;
    search_params: null;
    body: {
      name: {
        eng: string;
        ind: string;
      };
      slug: string;
      icon: string | null;
    };
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      id: string;
      name: {
        eng: string | null;
        ind: string | null;
      };
      slug: string;
      icon: string | null;
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
    fields?: string[];
  };
}

/**
 * [PUT] Edit Profession
 * @description Update profession data according to request body
 */
export interface EditProfession {
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
      icon: string | null;
    };
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      id: string;
      name: {
        eng: string | null;
        ind: string | null;
      };
      slug: string;
      icon: string | null;
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
    fields?: string[];
  };
}

/**
 * [DELETE] Remove Profession
 * @description Delete profession by it's ID
 */
export interface RemoveProfession {
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
      name: {
        eng: string | null;
        ind: string | null;
      };
      slug: string;
      icon: string | null;
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
  };
}
