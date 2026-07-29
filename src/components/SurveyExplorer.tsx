import { useMemo, useState } from 'preact/hooks';

interface SurveyQuestion {
  label: string;
  meta: string;
  n2024: number;
  n2025: number;
  rows: Array<{
    label: string;
    y2024: number;
    y2025: number;
    note: string;
  }>;
}

export type SurveyData = Record<string, SurveyQuestion>;

type Category = string;
type SurveyYear = 'year2024' | 'year2025' | 'both';
type SortMode = 'value' | 'delta';

interface SurveyRow {
  label: string;
  year2024: number;
  year2025: number;
  note: string;
  originalIndex: number;
  value: number;
  delta: number;
}

interface TabsProps {
  data: SurveyData;
  category: Category;
  onSelect: (category: Category) => void;
}

function Tabs({ data, category, onSelect }: TabsProps) {
  const categories = Object.keys(data);

  return (
    <div class="survey-tabs" role="tablist" aria-label="Survey question">
      {categories.map((categoryKey) => (
        <button
          role="tab"
          aria-selected={category === categoryKey}
          onClick={() => onSelect(categoryKey)}
        >
          {data[categoryKey].label}
        </button>
      ))}
    </div>
  );
}

interface ToolbarProps {
  year: SurveyYear;
  sortMode: SortMode;
  metadata: string;
  responseCount: number | string;
  onYearChange: (year: SurveyYear) => void;
  onSortChange: () => void;
}

function Toolbar({
  year,
  sortMode,
  metadata,
  responseCount,
  onYearChange,
  onSortChange,
}: ToolbarProps) {
  const sortLabel = sortMode === 'value' ? 'Sorted by share ↓' : 'Sorted by change ↓';

  return (
    <div class="survey-toolbar">
      <div class="year-toggle">
        <button aria-pressed={year === 'year2024'} onClick={() => onYearChange('year2024')}>
          2024
        </button>
        <button aria-pressed={year === 'year2025'} onClick={() => onYearChange('year2025')}>
          2025
        </button>
        <button aria-pressed={year === 'both'} onClick={() => onYearChange('both')}>
          Compare
        </button>
      </div>
      <button onClick={onSortChange}>{sortLabel}</button>
      <span>
        {metadata} · N={responseCount}
      </span>
    </div>
  );
}

interface BarRowProps {
  row: SurveyRow;
  focusedIndex: number;
  year: SurveyYear;
  maximumValue: number;
  onFocus: (index: number) => void;
}

function BarRow({ row, focusedIndex, year, maximumValue, onFocus }: BarRowProps) {
  const valueWidth = `${Math.round((row.value / maximumValue) * 100)}%`;
  const comparisonWidth = `${Math.round((row.year2024 / maximumValue) * 100)}%`;

  return (
    <button
      class={row.originalIndex === focusedIndex ? 'focused' : ''}
      onMouseEnter={() => onFocus(row.originalIndex)}
      onFocus={() => onFocus(row.originalIndex)}
      onClick={() => onFocus(row.originalIndex)}
    >
      <span>{row.label}</span>
      <i>
        <b style={{ width: valueWidth }}></b>
        {year === 'both' && <em style={{ width: comparisonWidth }}></em>}
      </i>
      <strong>{row.value}%</strong>
      <small class={row.delta < 0 ? 'negative' : ''}>
        {row.delta > 0 ? '+' : ''}
        {row.delta} pts
      </small>
    </button>
  );
}

interface FocusPanelProps {
  selectedRow: SurveyRow;
}

function FocusPanel({ selectedRow }: FocusPanelProps) {
  return (
    <div class="survey-focus">
      <div>
        <span>SELECTED</span>
        <strong>{selectedRow.label}</strong>
      </div>
      <div>
        <span>SHARE OF RESPONDENTS</span>
        <strong>{selectedRow.value}% of respondents</strong>
      </div>
      <div>
        <span>YEAR ON YEAR</span>
        <strong>
          {selectedRow.delta > 0 ? '+' : ''}
          {selectedRow.delta} pts vs 2024
        </strong>
      </div>
      {selectedRow.note && <p>{selectedRow.note}</p>}
    </div>
  );
}

interface Props {
  data: SurveyData;
}

export default function SurveyExplorer({ data }: Props) {
  const [category, setCategory] = useState<Category>('challenges');
  const [year, setYear] = useState<SurveyYear>('year2025');
  const [sortMode, setSortMode] = useState<SortMode>('value');
  const [focusedIndex, setFocusedIndex] = useState(0);

  const selectedSurvey = data[category];
  const currentYear = year === 'both' ? 'year2025' : year;

  let responseCount: number | string = selectedSurvey.n2025;

  if (year === 'year2024') {
    responseCount = selectedSurvey.n2024;
  }

  if (year === 'both') {
    responseCount = `${selectedSurvey.n2024} / ${selectedSurvey.n2025}`;
  }

  const rows = useMemo(() => {
    const derivedRows: SurveyRow[] = selectedSurvey.rows.map((row, originalIndex) => {
      const value = currentYear === 'year2024' ? row.y2024 : row.y2025;
      const delta = row.y2025 - row.y2024;

      return {
        label: row.label,
        year2024: row.y2024,
        year2025: row.y2025,
        note: row.note,
        originalIndex,
        value,
        delta,
      };
    });

    return derivedRows.sort((firstRow, secondRow) => {
      if (sortMode === 'delta') {
        return secondRow.delta - firstRow.delta;
      }

      return secondRow.value - firstRow.value;
    });
  }, [selectedSurvey, currentYear, sortMode]);

  const maximumValue = Math.max(...rows.map((row) => Math.max(row.year2024, row.year2025)));
  const selectedRow = rows.find((row) => row.originalIndex === focusedIndex) ?? rows[0];

  const selectCategory = (nextCategory: Category) => {
    setCategory(nextCategory);
    setFocusedIndex(0);
  };

  const toggleSortMode = () => {
    setSortMode(sortMode === 'value' ? 'delta' : 'value');
  };

  return (
    <div class="survey-island" data-survey-card>
      <Tabs data={data} category={category} onSelect={selectCategory} />
      <Toolbar
        year={year}
        sortMode={sortMode}
        metadata={selectedSurvey.meta}
        responseCount={responseCount}
        onYearChange={setYear}
        onSortChange={toggleSortMode}
      />
      <div class="survey-bars">
        {rows.map((row) => (
          <BarRow
            row={row}
            focusedIndex={focusedIndex}
            year={year}
            maximumValue={maximumValue}
            onFocus={setFocusedIndex}
          />
        ))}
      </div>
      <FocusPanel selectedRow={selectedRow} />
    </div>
  );
}
