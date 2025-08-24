import Select from "react-select";

export type OptionType = {value: string; label: string;}

type SortSelectProps = {
    order: OptionType | null;
    setOrder: (option: OptionType) => void;
    options: OptionType[];
}

function SortSelect({ order, setOrder, options }: SortSelectProps) {
    return (
    <div className="flex flex-col">
      <label className="mb-1 text-gray-700 font-medium">Sort By</label>
      <div className="p-2 bg-white rounded-2xl shadow-md w-46">
        <Select
          value={order}
          onChange={(option) => setOrder(option as OptionType)}
          options={options}
          isSearchable={false}
          closeMenuOnSelect
          className="w-full text-lg font-medium"
          styles={{
            control: (provided) => ({
              ...provided,
              border: "none",
              boxShadow: "none",
              padding: "0.25rem",
              minHeight: "2.5rem",
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: "1rem",
              fontWeight: 500,
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: "1rem",
            }),
          }}
        />
      </div>
    </div>
  );
}

export default SortSelect;
