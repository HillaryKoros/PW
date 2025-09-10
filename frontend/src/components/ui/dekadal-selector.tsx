import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface DekadalSelectorProps {
  selectedYear: number;
  selectedMonth: number;
  selectedDekad: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onDekadChange: (dekad: number) => void;
  availableYears?: number[];
  availableMonths?: number[];
}

export function DekadalSelector({
  selectedYear,
  selectedMonth,
  selectedDekad,
  onYearChange,
  onMonthChange,
  onDekadChange,
  availableYears = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  availableMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
}: DekadalSelectorProps) {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return (
    <div className="space-y-3">
      {/* Date Info */}
      <div className="text-xs text-gray-500 mb-2">
        {selectedYear} {monthNames[selectedMonth - 1]}, Dekad: {selectedDekad === 1 ? "1st" : selectedDekad === 2 ? "2nd" : "3rd"}
      </div>
      
      {/* Selectors */}
      <div className="grid grid-cols-3 gap-2">
        {/* Year Selector */}
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Year</label>
          <Select value={selectedYear.toString()} onValueChange={(value) => onYearChange(parseInt(value))}>
            <SelectTrigger className="w-full h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Month Selector */}
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Month</label>
          <Select value={selectedMonth.toString()} onValueChange={(value) => onMonthChange(parseInt(value))}>
            <SelectTrigger className="w-full h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableMonths.map(month => (
                <SelectItem key={month} value={month.toString()}>
                  {monthNames[month - 1]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dekad Selector */}
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Dekad</label>
          <Select value={selectedDekad.toString()} onValueChange={(value) => onDekadChange(parseInt(value))}>
            <SelectTrigger className="w-full h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1st</SelectItem>
              <SelectItem value="2">2nd</SelectItem>
              <SelectItem value="3">3rd</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

// Helper functions for dekadal date conversion
export function dekadToDateString(year: number, month: number, dekad: number): string {
  const dekadDay = dekad === 1 ? "01" : dekad === 2 ? "11" : "21";
  const monthStr = month.toString().padStart(2, '0');
  return `${year}${monthStr}${dekadDay}`;
}

export function dateStringToDekad(dateString: string): { year: number; month: number; dekad: number } {
  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(4, 6));
  const day = parseInt(dateString.substring(6, 8));
  
  let dekad = 1;
  if (day >= 21) dekad = 3;
  else if (day >= 11) dekad = 2;
  
  return { year, month, dekad };
}