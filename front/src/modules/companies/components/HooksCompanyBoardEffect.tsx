import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { useColumnDefinitionsFromFieldMetadata } from '@/object-metadata/hooks/useColumnDefinitionsFromFieldMetadata';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { filterAvailableTableColumns } from '@/object-record/utils/filterAvailableTableColumns';
import { useRecordBoardScopedStates } from '@/ui/object/record-board/hooks/internal/useRecordBoardScopedStates';
import { availableRecordBoardCardFieldsScopedState } from '@/ui/object/record-board/states/availableRecordBoardCardFieldsScopedState';
import { recordBoardCardFieldsScopedState } from '@/ui/object/record-board/states/recordBoardCardFieldsScopedState';
import { recordBoardFiltersScopedState } from '@/ui/object/record-board/states/recordBoardFiltersScopedState';
import { recordBoardSortsScopedState } from '@/ui/object/record-board/states/recordBoardSortsScopedState';
import { useSetRecoilScopedStateV2 } from '@/ui/utilities/recoil-scope/hooks/useSetRecoilScopedStateV2';
import { useViewScopedStates } from '@/views/hooks/internal/useViewScopedStates';
import { useViewBar } from '@/views/hooks/useViewBar';
import { ViewType } from '@/views/types/ViewType';
import { mapViewFieldsToBoardFieldDefinitions } from '@/views/utils/mapViewFieldsToBoardFieldDefinitions';

type HooksCompanyBoardEffectProps = {
  viewBarId: string;
  recordBoardId: string;
};

export const HooksCompanyBoardEffect = ({
  viewBarId,
  recordBoardId,
}: HooksCompanyBoardEffectProps) => {
  const {
    setAvailableFilterDefinitions,
    setAvailableSortDefinitions,
    setAvailableFieldDefinitions,
    setViewObjectMetadataId,
    setViewType,
  } = useViewBar({ viewBarId });

  const { objectMetadataItem } = useObjectMetadataItem({
    objectNameSingular: 'opportunity',
  });

  const { columnDefinitions, filterDefinitions, sortDefinitions } =
    useColumnDefinitionsFromFieldMetadata(objectMetadataItem);

  const setAvailableBoardCardFields = useSetRecoilScopedStateV2(
    availableRecordBoardCardFieldsScopedState,
    'company-board-view',
  );

  useEffect(() => {
    if (!objectMetadataItem) {
      return;
    }
    setAvailableFilterDefinitions?.(filterDefinitions);
    setAvailableSortDefinitions?.(sortDefinitions);
    setAvailableFieldDefinitions?.(columnDefinitions);
  }, [
    columnDefinitions,
    filterDefinitions,
    objectMetadataItem,
    setAvailableFieldDefinitions,
    setAvailableFilterDefinitions,
    setAvailableSortDefinitions,
    sortDefinitions,
  ]);

  useEffect(() => {
    const availableTableColumns = columnDefinitions.filter(
      filterAvailableTableColumns,
    );

    setAvailableBoardCardFields(availableTableColumns);
  }, [columnDefinitions, setAvailableBoardCardFields]);

  useEffect(() => {
    if (!objectMetadataItem) {
      return;
    }
    setViewObjectMetadataId?.(objectMetadataItem.id);
    setViewType?.(ViewType.Kanban);
  }, [objectMetadataItem, setViewObjectMetadataId, setViewType]);

  const {
    currentViewFieldsState,
    currentViewFiltersState,
    currentViewSortsState,
  } = useViewScopedStates({ viewScopeId: viewBarId });

  const currentViewFields = useRecoilValue(currentViewFieldsState);
  const currentViewFilters = useRecoilValue(currentViewFiltersState);
  const currentViewSorts = useRecoilValue(currentViewSortsState);

  //TODO: Modify to use scopeId
  const setBoardCardFields = useSetRecoilScopedStateV2(
    recordBoardCardFieldsScopedState,
    'company-board',
  );
  const setBoardCardFilters = useSetRecoilScopedStateV2(
    recordBoardFiltersScopedState,
    'company-board',
  );

  const setBoardCardSorts = useSetRecoilScopedStateV2(
    recordBoardSortsScopedState,
    'company-board',
  );

  useEffect(() => {
    if (currentViewFields) {
      setBoardCardFields(
        mapViewFieldsToBoardFieldDefinitions(
          currentViewFields,
          columnDefinitions,
        ),
      );
    }
  }, [columnDefinitions, currentViewFields, setBoardCardFields]);

  useEffect(() => {
    if (currentViewFilters) {
      setBoardCardFilters(currentViewFilters);
    }
  }, [currentViewFilters, setBoardCardFilters]);

  useEffect(() => {
    if (currentViewSorts) {
      setBoardCardSorts(currentViewSorts);
    }
  }, [currentViewSorts, setBoardCardSorts]);

  const { setEntityCountInCurrentView } = useViewBar({ viewBarId });

  const { savedOpportunitiesState } = useRecordBoardScopedStates({
    recordBoardScopeId: recordBoardId,
  });

  const savedOpportunities = useRecoilValue(savedOpportunitiesState);

  useEffect(() => {
    setEntityCountInCurrentView(savedOpportunities.length);
  }, [savedOpportunities.length, setEntityCountInCurrentView]);

  return <></>;
};
