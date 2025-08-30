import Select from "react-select";

export type OptionType = {value: string; label: string;}

type SortSelectProps = {
    order: OptionType | null;
    setOrder: (option: OptionType) => void;
    options: OptionType[];
    query: string;
    handleSubmit: (query: string) => void;
}

function SortSelect({ order, setOrder, options, query, handleSubmit }: SortSelectProps) {
    return (
    <div className="flex flex-col min-w-0 w-[min(12rem,100%)]">
      <label className="mb-1 text-gray-700 font-medium">Sort By</label>

      <div className="p-2 bg-white rounded-2xl shadow-md min-w-0">
        <Select
          value={order}
          onChange={(option) => {
              setOrder(option as OptionType);
              handleSubmit(query);
          }}
          options={options}
          isSearchable={false}
          closeMenuOnSelect
          className="w-full min-w-0 text-[clamp(0.875rem,2vw,1rem)] font-medium"
          styles={{
            control: (provided) => ({
              ...provided,
              border: "none",
              boxShadow: "none",
              padding: "0.25rem",
              minHeight: "2.5rem",
              width: "100%",
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              fontWeight: 500,
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: "1rem",
              zIndex: 50, // ensures menu is above other elements
            }),
          }}
        />
      </div>
    </div>
  );
}

export default SortSelect;
