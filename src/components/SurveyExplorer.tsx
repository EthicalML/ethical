import { useMemo, useState } from 'preact/hooks';
import DATA from '../data/survey.json';
type Category = keyof typeof DATA;
type Year = 'a' | 'b' | 'both';

export default function SurveyExplorer() {
  const [category,setCategory]=useState<Category>('challenges');
  const [year,setYear]=useState<Year>('b');
  const [sort,setSort]=useState<'value'|'delta'>('value');
  const [focus,setFocus]=useState(0);
  const set=DATA[category],currentYear=year==='both'?'b':year;
  const rows=useMemo(()=>set.rows.map((row,i)=>({label:row.label,a:row.y2024,b:row.y2025,note:row.note,i,v:currentYear==='a'?row.y2024:row.y2025,d:row.y2025-row.y2024})).sort((x,y)=>sort==='delta'?y.d-x.d:y.v-x.v),[category,currentYear,sort]);
  const max=Math.max(...rows.map(row=>Math.max(row.a,row.b))),selected=rows.find(row=>row.i===focus)||rows[0];
  return <div class="survey-island" data-survey-card>
    <div class="survey-tabs" role="tablist" aria-label="Survey question">{(Object.keys(DATA) as Category[]).map(key=><button role="tab" aria-selected={category===key} onClick={()=>{setCategory(key);setFocus(0);}}>{DATA[key].label}</button>)}</div>
    <div class="survey-toolbar"><div class="year-toggle"><button aria-pressed={year==='a'} onClick={()=>setYear('a')}>2024</button><button aria-pressed={year==='b'} onClick={()=>setYear('b')}>2025</button><button aria-pressed={year==='both'} onClick={()=>setYear('both')}>Compare</button></div><button onClick={()=>setSort(sort==='value'?'delta':'value')}>{sort==='value'?'Sorted by share ↓':'Sorted by change ↓'}</button><span>{set.meta} · N=1,240</span></div>
    <div class="survey-bars">{rows.map(row=><button class={row.i===focus?'focused':''} onMouseEnter={()=>setFocus(row.i)} onFocus={()=>setFocus(row.i)} onClick={()=>setFocus(row.i)}>
      <span>{row.label}</span><i><b style={{width:`${Math.round(row.v/max*100)}%`}}></b>{year==='both'&&<em style={{width:`${Math.round(row.a/max*100)}%`}}></em>}</i><strong>{row.v}%</strong><small class={row.d<0?'negative':''}>{row.d>0?'+':''}{row.d} pts</small>
    </button>)}</div>
    <div class="survey-focus"><div><span>SELECTED</span><strong>{selected.label}</strong></div><div><span>SHARE OF RESPONDENTS</span><strong>{selected.v}% of respondents</strong></div><div><span>YEAR ON YEAR</span><strong>{selected.d>0?'+':''}{selected.d} pts vs 2024</strong></div><p>{selected.note}</p></div>
  </div>;
}
