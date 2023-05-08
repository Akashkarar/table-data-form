import { useCallback, useMemo, useReducer, useState, useEffect } from "react";

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
    name: "Joe Marry Smith",
    gender: "Male",
    email: "joe.james@mail.com",
    phone: "8204629302",
  },
  {
    id: 2,
    name: "Akash",
    gender: "Male",
    email: "akash@mail.com",
    phone: "8912343802",
  },
  {
    id: 3,
    name: "Hailee",
    gender: "Female",
    email: "hail.m@mail.com",
    phone: "4913438021",
  },
  {
    id: 4,
    name: "Shiv",
    gender: "Male",
    email: "shiv@mail.com",
    phone: "8912343801",
  },
  {
    id: 5,
    name: "Krish",
    gender: "Male",
    email: "krish@mail.com",
    phone: "9989123431",
  },
  {
    id: 6,
    name: "Ganga",
    gender: "Female",
    email: "ganga@mail.com",
    phone: "9989123431",
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

function EditForm(props: {
  value: Row;
  onSubmit: (arg0: Row) => void;
  onCancel(): void;
}) {
  const [form, setForm] = useReducer(
    (current: Row, latest: Partial<Row>) => ({ ...current, ...latest }),
    props.value
  );

  const dataKeys = useMemo(() => {
    setForm(props.value);
    const keys = Object.keys(props.value);
    keys.shift();
    return keys;
  }, [props.value]);

  useEffect(() => {
    console.log("render");
  });

  return (
    <div className="border-b border-gray-900/10 pb-12 max-w-sm ml-1 text-gray-400">
      <h2 className="text-base font-semibold leading-7">
        Personal Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600"></p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(e.currentTarget.id);
          props.onSubmit(form);
        }}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
      >
        {dataKeys.map((key, index) => (
          <div key={index} className="sm:col-span-3">
            <label
              htmlFor={key}
              className="block text-sm font-medium leading-6"
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
                className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {/* </div> */}
            </div>
          </div>
        ))}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6"
            style={{ margin: "0.5rem" }}
            onClick={() => {
              props.onCancel();
            }}
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
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

// Actions is a component for table row and it will be having update and delete functionality
const Actions: React.FC<{ onEdit(): void; onDelete(): void }> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <button
        style={{ marginRight: 10 }}
        className="text-gray-400 hover:text-gray-100 mr-2"
        onClick={(e) => {
          e.preventDefault();
          // setEditRow(row);
          onEdit();
        }}
      >
        Edit
      </button>
      <button
        className="text-gray-400 hover:text-gray-100 mr-2"
        onClick={(e) => {
          e.preventDefault();
          if (confirm("Arge you sure want to delete?")) {
            // tableData.deleteRow(row);
            onDelete();
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

const PageItem: React.FC<{
  first?: boolean;
  last?: boolean;
  current?: boolean;
  children: React.ReactNode;
  onClick(): void;
}> = ({ first, last, current, children, onClick }) => {
  if (current) {
    return (
      <li>
        <a
          className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <a
        className={`bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0${
          first ? " rounded-l-lg" : last ? " rounded-r-lg" : ""
        } leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {children}
      </a>
    </li>
  );
};
const Pagination: React.FC<{
  value: number;
  total: number;
  onClickValue(value: number): void;
  onPrevious(): void;
  onNext(): void;
}> = ({ onClickValue, onNext, onPrevious, total, value }) => {
  const pages = useMemo(() => {
    const element: JSX.Element[] = [];
    for (let i = 1; i <= total; i++)
      element.push(
        <PageItem
          key={i}
          current={i === value}
          onClick={() => {
            onClickValue(i);
          }}
        >
          {i}
        </PageItem>
      );
    return element;
  }, [onClickValue, total, value]);
  return (
    <nav aria-label="Page navigation" className="h-10">
      <ul className="inline-flex -space-x-px">
        <PageItem first onClick={onPrevious}>
          Previous
        </PageItem>
        {pages}
        <PageItem last onClick={onNext}>
          Next
        </PageItem>
      </ul>
    </nav>
  );
};

function Table() {
  const tableData = useTableData();
  // console.log({ tableData });
  const [editRow, setRowDataToUpdate] = useState<Row>();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 5;
  const visibleRows = useMemo(() => {
    const rows: Row[] = [];
    const end = itemsPerPage * currentPage;
    const start = end - itemsPerPage;
    for (let i = start; i < end; i++) {
      if (i >= tableData.rows.length) {
        break;
      }
      rows.push(tableData.rows[i]);
    }
    return rows;
  }, [currentPage, tableData.rows]);

  const totalPage = useMemo(
    () => Math.ceil(tableData.rows.length / itemsPerPage),
    [tableData.rows.length]
  );

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        {/* Table with user's details and good UI */}

        {/* edit form without animation */}
        {/* {editRow && (
          <EditForm
            value={
              editRow ?? { email: '', gender: '', id: -1, name: '', phone: '' }
            }
            onSubmit={(newRow) => {
              tableData.updateRow(newRow);
              setRowDataToUpdate(undefined);
            }}
            onCancel={() => {
              setRowDataToUpdate(undefined);
            }}
          />
        )} */}

        {/* edit form with animation */}
        <div
          style={{
            translate: editRow ? -70 : 0,
            opacity: editRow ? 1 : 0,
            transition: "all 0.2s ease-out 0s",
          }}
        >
          <EditForm
            value={
              editRow === undefined
                ? { email: "", gender: "", id: -1, name: "", phone: "" }
                : editRow
            }
            onSubmit={(newRow) => {
              tableData.updateRow(newRow);
              setRowDataToUpdate(undefined);
            }}
            onCancel={() => {
              setRowDataToUpdate(undefined);
            }}
          />
        </div>

        {/* Table with user's details and good UI */}
        <div className="col-span-12">
          <div
            className="overflow-auto lg:overflow-visible"
            style={{
              height: "calc(65px * 7)",
              width: "calc(90px * 7)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <table className="table text-gray-400 border-separate space-y-6 text-sm">
              <thead className="bg-gray-800 text-gray-500">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Gender</th>
                  <th className="p-3 text-left ">Phone</th>
                  <th className="p-3 text-left ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => {
                  return (
                    <tr key={row.id} className="bg-gray-800">
                      <td className="p-3 text-center">{row.name}</td>
                      <td className="p-3 text-left">{row.gender}</td>
                      <td className="p-3 text-left">{row.phone}</td>
                      <td className="p-3 text-left">{row.email}</td>
                      <td className="p-3 text-left">
                        <Actions
                          onDelete={() => {
                            tableData.deleteRow(row);
                          }}
                          onEdit={() => {
                            setRowDataToUpdate(row);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              value={currentPage}
              total={totalPage}
              onClickValue={(value) => {
                console.log(value);
                setCurrentPage(value);
              }}
              onPrevious={() => {
                setCurrentPage((c) => (c - 1 > 0 ? c - 1 : c));
              }}
              onNext={() => {
                setCurrentPage((c) => (c + 1 <= totalPage ? c + 1 : c));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
