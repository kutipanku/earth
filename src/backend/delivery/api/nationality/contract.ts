/**
 * [GET] Get Nationality
 * @description Retrieve detailed data of a nationality by it's ID
 */
export interface GetNationality {
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
      name: {
        eng: string | null;
        ind: string | null;
      };
      slug: string;
      flag: string | null;
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
  };
}

/**
 * [GET] Get Nationalities
 * @description Retrieve list of nationality
 */
export interface GetNationalities {
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
        flag: string | null;
      }>;
      total: number;
    };
  };
}

/**
 * [GET] Get Nationality options
 * @description Retrieve simpler list of nationality based on it's name
 */
export interface GetNationalityOptions {
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
 * [POST] Add Nationality
 * @description Create new nationality according to request body
 */
export interface AddNationality {
  request: {
    params: null;
    search_params: null;
    body: {
      name: {
        eng: string;
        ind: string;
      };
      slug: string;
      flag: string | null;
    };
    response: {
      success: boolean;
      data: {
        id: string;
        name: {
          eng: string | null;
          ind: string | null;
        };
        slug: string;
        flag: string | null;
        metadata: {
          created_at: string;
          updated_at: string;
        };
      } | null;
    };
  };
}

/**
 * [PUT] Edit Nationality
 * @description Update nationality data according to request body
 */
export interface EditNationality {
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
      flag: string | null;
    };
  };
  response: {
    success: boolean;
    data: {
      id: string;
      name: {
        eng: string | null;
        ind: string | null;
      };
      slug: string;
      flag: string | null;
      metadata: {
        created_at: string;
        updated_at: string;
      };
    } | null;
  };
}

/**
 * [DELETE] Remove Nationality
 * @description Delete nationality by it's ID
 */
export interface RemoveNationality {
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
      name: {
        eng: string | null;
        ind: string | null;
      };
      slug: string;
      flag: string | null;
      metadata: {
        created_at: string;
        updated_at: string;
      };
    } | null;
  };
}
