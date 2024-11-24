import { EColumns } from '@/models/reusableEnums';

export const months = Object.keys(EColumns).filter((x) => x !== EColumns.Annual && x !== EColumns.Year);
export const columns = Object.values<string>(EColumns);
