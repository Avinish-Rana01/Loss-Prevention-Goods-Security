import React, { useState } from 'react';
import PageHeader from '../common/PageHeader';
import StoreFilter from '../common/StoreFilter';
import DateFilter from '../common/DateFilter';
import StatCard from '../common/StatCard';
import TagStatusDistributionChart from './TagStatusDistributionChart';
import CategoryWiseLoss from './CategoryWiseLoss';
import TopStolenData from './TopStolenData';
import { Tag, TagX, AlertTriangle, TrendingDown } from 'lucide-react';

const AnalyticsView = () => {
  const [loading, setLoading] = useState(false);

  const handleStoreChange = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-4">
      {/* 1. Header with Store & Date Range Filters */}
      <PageHeader title="Analytics">
        <StoreFilter onStoreChange={handleStoreChange} />
        <DateFilter />
      </PageHeader>

      {/* 2. Key Metrics Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tags"
          count="12,568"
          icon={Tag}
          variant="green"
          loading={loading}
        />
        <StatCard
          title="Untagged"
          count="315"
          icon={TagX}
          variant="blue"
          loading={loading}
        />
        <StatCard
          title="Theft Alerts"
          count="280"
          icon={AlertTriangle}
          variant="gray"
          loading={loading}
        />
        <StatCard
          title="Potential Loss"
          count="₹4,23,010"
          icon={TrendingDown}
          variant="rose"
          loading={loading}
        />
      </div>

      {/* 3. Analytics Visualizations Grid (2 Cards in One Row, Compact & Creative) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Row 1, Left: Tag Status Distribution (Pie / Donut Chart) */}
        <TagStatusDistributionChart />

        {/* Row 1, Right: Category Wise Loss (Horizontal Bar Chart) */}
        <CategoryWiseLoss />

        {/* Row 2: Top Stolen Items (Spanning 2 columns with dual-column items) */}
        <TopStolenData className="lg:col-span-2" />
      </div>
    </div>
  );
};

export default AnalyticsView;
