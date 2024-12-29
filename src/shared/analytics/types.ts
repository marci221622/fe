export type MindboxType = { operation: string; data: any };

export type DYCtx =
  | {
      data?: (number | string)[];
      lng?: string;
      type: 'PRODUCT' | 'CATEGORY' | 'HOMEPAGE';
    }
  | {
      type: 'OTHER';
      lng?: string;
    }
  | {
      type: 'CART';
      data: string[];
    }
  | {
      type: 'SEARCH';
      lng?: string;
    };

export type DYEvent =
  | {
      type: 'spa' | 'context';
      ctx: DYCtx;
    }
  | {
      type: 'event';
      payload: {
        name: string;
        properties: any;
      };
    };

export type Analytics = {
  gtm?: any[];
  mindbox?: MindboxType[];
  mindboxJSON?: MindboxType[];
  dy?: DYEvent;
};
