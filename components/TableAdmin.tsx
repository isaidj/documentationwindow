import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Help, StateHelp } from "@/domain/graphql";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import DropdownMenu from "./ui/DropdownMenu";

interface TableAdminProps {
  data: Help[];
  onSave: (updatedRow: Help) => void;
  isLoading: boolean;
  stateFilter: StateHelp | "all";
}

export const stateConfig: Record<StateHelp, { label: string; color: string }> =
  {
    [StateHelp.Active]: { label: "Activo", color: "text-green-500" },
    [StateHelp.Inactive]: { label: "Inactivo", color: "text-red-500" },
    [StateHelp.PartialActive]: {
      label: "Parcialmente Activo",
      color: "text-yellow-500",
    },
  };

const TableAdmin: React.FC<TableAdminProps> = ({
  data,
  onSave,
  isLoading,
  stateFilter,
}) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Help[]>(data);

  const handleChange = (row: Help, field: keyof Help, value: any) => {
    const updatedData = editedData.map((item) =>
      item.id === row.id ? { ...item, [field]: value } : item
    );
    setEditedData(updatedData);
  };

  const handleSave = (row: Help) => {
    onSave(row);
    setEditingRow(null);
  };

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const filteredData =
    stateFilter === "all"
      ? editedData
      : editedData.filter((item) => item.state === stateFilter);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>OutlineID</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Fecha de Creación</TableHead>
            <TableHead className="w-32">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.id}</TableCell>
              <TableCell>
                {editingRow === row.id ? (
                  <DropdownMenu
                    trigger={
                      <Button
                        variant="outline"
                        className={`text-sm font-medium ${
                          stateConfig[row.state].color
                        }`}
                      >
                        {stateConfig[row.state].label}
                      </Button>
                    }
                    contentSide="left"
                    content={(closeMenu) =>
                      Object.values(StateHelp).map((stateOption) => (
                        <a
                          key={stateOption}
                          href="#"
                          className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${stateConfig[stateOption].color}`}
                          onClick={() => {
                            handleChange(row, "state", stateOption);
                            closeMenu();
                          }}
                        >
                          {stateConfig[stateOption].label}
                        </a>
                      ))
                    }
                  />
                ) : (
                  <span
                    className={`${stateConfig[row.state].color} font-medium`}
                  >
                    {stateConfig[row.state].label}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {editingRow === row.id ? (
                  <Input
                    value={row.outlineId}
                    onChange={(e) =>
                      handleChange(row, "outlineId", e.target.value)
                    }
                    className="w-full"
                  />
                ) : (
                  <span className="font-mono text-sm">{row.outlineId}</span>
                )}
              </TableCell>
              <TableCell>
                {editingRow === row.id ? (
                  <Input
                    value={row.url}
                    onChange={(e) => handleChange(row, "url", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <a
                    href={row.url}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.url}
                  </a>
                )}
              </TableCell>
              <TableCell>
                {editingRow === row.id ? (
                  <Input
                    value={row.description}
                    onChange={(e) =>
                      handleChange(row, "description", e.target.value)
                    }
                    className="w-full"
                  />
                ) : (
                  row.description
                )}
              </TableCell>
              <TableCell>
                {new Date(row.createDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {editingRow === row.id ? (
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleSave(row)}
                      className="bg-green-500 hover:bg-green-600 text-white"
                      variant="outline"
                      size="sm"
                    >
                      Guardar
                    </Button>
                    <Button
                      onClick={() => setEditingRow(null)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                      variant="outline"
                      size="sm"
                    >
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setEditingRow(row.id)}
                    variant="outline"
                    size="sm"
                  >
                    Editar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableAdmin;
