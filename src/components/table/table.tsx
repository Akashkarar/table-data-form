import { table } from "console";
import { useCallback, useMemo, useReducer, useState } from "react";

type Row = {
  id: number;
  name: string;
  gender: string;
  email: string;
  phone: string;
};
const initialRows: Row[] = [
  {
    id: 1,
    name: "Name",
    gender: "male",
    email: "name@mail.com",
    phone: "089123438021",
  },
  {
    id: 2,
    name: "Name",
    gender: "male",
    email: "name@mail.com",
    phone: "089123438021",
  },
  {
    id: 3,
    name: "Name",
    gender: "male",
    email: "name@mail.com",
    phone: "089123438021",
  },
  {
    id: 4,
    name: "Name",
    gender: "male",
    email: "name@mail.com",
    phone: "089123438021",
  },
  {
    id: 5,
    name: "Name",
    gender: "male",
    email: "name@mail.com",
    phone: "089123438021",
  },
];
const useTableData = () => {
  const [rows, setRows] = useReducer(
    (
      state: typeof initialRows,
      action: { type: "edit-row" | "delete-row"; row?: Row }
    ) => {
      switch (action.type) {
        case "edit-row":
          // if (action.row) state.push(action.row);
          return state.map((row) =>
            row.id === action.row?.id ? action.row : row
          );
        case "delete-row":
          return state.filter((row) => row.id != action.row?.id);
        default:
          return state;
      }
    },
    initialRows
  );
  const updateRow = useCallback((row: Row) => {
    setRows({ type: "edit-row", row });
  }, []);
  const deleteRow = useCallback((row: Row) => {
    setRows({ type: "delete-row", row });
  }, []);
  return { rows, deleteRow, updateRow };
};

function EditForm(props: { data: Row; setRow: (arg0: Row) => void }) {
  console.log({ EditFormData: props.data });
  const dataKeys = useMemo(() => Object.keys(props.data), [props.data]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e.currentTarget.elements.namedItem("name"));
        // setRow({});
      }}
    >
      {dataKeys.map((key) => (
        <label key={key} htmlFor={key}>
          {key}:
          <input
            name={key}
            id={key}
            value={props.data[key as keyof Row]}
            type="text"
          />
        </label>
      ))}
      <button type="submit">Update</button>
    </form>
  );
}
function Table() {
  const tableData = useTableData();
  console.log({ tableData });
  const { rows } = tableData;
  const [editRow, setEditRow] = useState<Row>();
  const [form, setForm] = useReducer(
    (current: Row, latest: Row) => ({ ...current, ...latest }),
    { email: "", id: -1, gender: "", name: "", phone: "" }
  );
  return (
    <div>
      {editRow && (
        <EditForm
          data={editRow}
          setRow={(newRow) => tableData.updateRow(newRow)}
        />
      )}
      <table>
        <caption>Add New Row</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.gender}</td>
              <td>{row.phone}</td>
              <td>
                <button
                  style={{ marginRight: 10 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setEditRow(row);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm("Arge you sure want to delete?")) {
                      tableData.deleteRow(row);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <button onClick={addRow}>Add Row</button> */}
    </div>
  );
}

export default Table;
