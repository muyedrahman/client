
export const CardSkeleton = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-xl border 
                  border-gray-100 dark:border-gray-700 p-5 animate-pulse"
  >
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      </div>
    </div>
    <div className="mt-4 h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="animate-pulse">
    {/* Header */}
    <div
      className="grid grid-cols-5 gap-4 px-4 py-3 
                    bg-gray-100 dark:bg-gray-800 rounded-t-xl mb-1"
    >
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
        ))}
    </div>
    {/* Rows */}
    {Array(rows)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-5 gap-4 px-4 py-3 
                               border-b border-gray-100 dark:border-gray-800"
        >
          {Array(5)
            .fill(0)
            .map((_, j) => (
              <div
                key={j}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                style={{ width: `${60 + Math.random() * 40}%` }}
              />
            ))}
        </div>
      ))}
  </div>
);

export const ChartSkeleton = () => (
  <div
    className="animate-pulse bg-white dark:bg-gray-800 
                  rounded-xl border border-gray-100 dark:border-gray-700 p-5"
  >
    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6" />
    <div className="flex items-end gap-3 h-40">
      {[60, 80, 45, 90, 55, 70, 85].map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-t-lg"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

export const StatCardSkeleton = () => (
  <div
    className="animate-pulse bg-white dark:bg-gray-800 
                  rounded-xl border border-gray-100 dark:border-gray-700 p-5"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-2 flex-1">
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  </div>
);
