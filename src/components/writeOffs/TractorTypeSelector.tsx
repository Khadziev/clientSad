interface TractorTypeSelectorProps {
  value: string;
  onChange: (selectedTractor: string) => void;
  tankCapacity: number;
}

const TractorTypeSelector: React.FC<TractorTypeSelectorProps> = ({ value, onChange, tankCapacity }) => (
  <div className="formGroup">
    <label className="label">Вид трактора</label>
    <select className="select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Выберите вид трактора</option>
      <option value="ландини">ландини</option>
      <option value="МТЗ-92.1">МТЗ-92.1</option>
      <option value="МТЗ-82.1">МТЗ-82.1</option>
    </select>
    {value && <p>Объем бака: {tankCapacity} литров</p>}
  </div>
);

export default TractorTypeSelector;
