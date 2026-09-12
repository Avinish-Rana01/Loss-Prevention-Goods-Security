import React from 'react';
import PageHeader from '../common/PageHeader';
import StoreFilter from '../common/StoreFilter';
import DateFilter from '../common/DateFilter';

const ReportsView = () => {
  return (
    <div className="space-y-4">
      <PageHeader title="Reports">
        <StoreFilter />
        <DateFilter />
      </PageHeader>
      <div></div>
    </div>
  );
};

export default ReportsView;
