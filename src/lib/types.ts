import { IAggsGroupedDaily, ITickers } from '@polygon.io/client-js';
import { ValuesType } from 'utility-types';

export type ITickerResult = ValuesType<ITickers['results']>;
export type ITickerAggsGroupedDaily = ValuesType<IAggsGroupedDaily['results']>;
