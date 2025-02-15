import type {
  GenericItem,
  Timestamp,
  MultilingualContent,
} from '../shared/types';

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
    success: boolean;
    message: string | null;
    data: {
      id: string;
      slug: string;
      name: string;
      description: MultilingualContent;
      dob: string | null;
      nationality: GenericItem | null;
      profession: GenericItem | null;
      metadata: Timestamp | null;
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
    success: boolean;
    message: string | null;
    data: {
      list: Array<{
        id: string;
        name: string;
        nationality: GenericItem | null;
        profession: GenericItem | null;
      }>;
      total: number;
    };
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
    success: boolean;
    message: string | null;
    data: GenericItem[];
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
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      id: string;
      slug: string;
      name: string;
      description: MultilingualContent;
      dob: string | null;
      nationality: GenericItem | null;
      profession: GenericItem | null;
      metadata: Timestamp | null;
      picture_url: string | null;
    } | null;
    fields?: string[];
  };
}

/**
 * [PUT] Edit Author
 * @description Update author data according to request body
 */
export interface EditAuthor {
  request: {
    params: {
      id: string;
    };
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
    success: boolean;
    message: string | null;
    data: {
      id: string;
      slug: string;
      name: string;
      description: MultilingualContent;
      dob: string | null;
      nationality: GenericItem | null;
      profession: GenericItem | null;
      metadata: Timestamp | null;
      picture_url: string | null;
    } | null;
    fields?: string[];
  };
}

/**
 * [DELETE] Remove Author
 * @description Delete author by it's ID
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
    success: boolean;
    message: string | null;
    data: {
      id: string;
      slug: string;
      name: string;
      description: MultilingualContent;
      dob: string | null;
      nationality: GenericItem | null;
      profession: GenericItem | null;
      metadata: Timestamp | null;
      picture_url: string | null;
    } | null;
  };
}
