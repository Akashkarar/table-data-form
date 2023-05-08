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
          const newState = state.map((row) =>
            row.id === action.row?.id ? action.row : row
          );
          console.log(newState);
          return newState;
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
  const [form, setForm] = useReducer(
    (current: Row, latest: Partial<Row>) => ({ ...current, ...latest }),
    props.data
  );

  const dataKeys = useMemo(() => {
    const keys = Object.keys(props.data);
    keys.shift();
    return keys;
  }, [props.data]);

  return (
    <div
      className="border-b border-gray-900/10 pb-12 max-w-sm ml-1"
      style={{ maxWidth: 440, marginLeft: "0.5rem" }}
    >
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Personal Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600"></p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(e.currentTarget.id);
          props.setRow(form);
        }}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
      >
        {dataKeys.map((key, index) => (
          <div key={index} className="sm:col-span-3">
            <label
              htmlFor={key}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {key}
            </label>
            <div className="mt-2">
              {/* <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'> */}
              <input
                name={key}
                id={key}
                value={form[key as keyof Row]}
                onChange={(e) =>
                  setForm({
                    [key]: e.currentTarget.value,
                  })
                }
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {/* </div> */}
            </div>
          </div>
        ))}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            style={{ margin: "0.5rem" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              margin: "0.5rem",
              paddingInline: "0.75rem",
              paddingBlock: "0.5rem",
              backgroundColor: "yellowgreen",
            }}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
function Table() {
  const tableData = useTableData();
  // console.log({ tableData });
  const { rows } = tableData;
  const [editRow, setEditRow] = useState<Row>();
  return (
    <div className="mx-auto px-6">
      {editRow && (
        <EditForm
          data={editRow}
          setRow={(newRow) => {
            tableData.updateRow(newRow);
            setEditRow(undefined);
          }}
        />
      )}

      {/* Table of user's details */}

      <table>
        <caption className="font-medium">Add New Row</caption>
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
    </div>
  );
}

export default Table;
