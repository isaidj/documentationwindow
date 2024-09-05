"use client";

import React, { useEffect, useState } from "react";

import { SearchIcon, ChevronLeft, PlusCircle, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useAuth } from "@/context/AuthContext";
import {
  FindHelpWhere,
  Help,
  HelpsQuery,
  MutationUpdateHelpArgs,
  StateHelp,
} from "@/domain/graphql";
import TableAdmin, { stateConfig } from "@/components/TableAdmin";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import DropdownMenu from "@/components/ui/DropdownMenu";

interface AdminPanelProps {
  goBack: () => void;
}

export default function AdminPanel({ goBack }: AdminPanelProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [globalFilterDebounced] = useDebounce(globalFilter, 500);
  const [data, setData] = useState<Help[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newHelp, setNewHelp] = useState<Partial<Help>>({
    url: "",
    description: "",
    outlineId: "",
  });
  const [stateFilter, setStateFilter] = useState<StateHelp | "all">(
    StateHelp.Active
  );
  const { isLoggedIn, loading: authLoading, token } = useAuth();

  const fetchData = async () => {
    if (!isLoggedIn()) {
      goBack();
      return;
    }

    setIsLoading(true);
    const where: FindHelpWhere = {
      _and: [
        {
          _or: [
            {
              url: {
                _like: `%${globalFilter}%`,
              },
            },
            {
              description: {
                _like: `%${globalFilter}%`,
              },
            },
            {
              outlineId: {
                _like: `%${globalFilter}%`,
              },
            },
          ],
        },
      ],
      // ...(stateFilter !== "all" ? [{ state: { _eq: stateFilter } }] : []),
      state: stateFilter !== "all" ? stateFilter : undefined,
    };

    try {
      const response = await fetch("/api/helpers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          where: where,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result: HelpsQuery = await response.json();

      setData(result.helps as Help[]);
    } catch (err) {
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!authLoading) {
      fetchData();
    }
  }, [
    isLoggedIn,
    authLoading,
    goBack,
    pageIndex,
    pageSize,
    globalFilterDebounced,
    stateFilter,
  ]);

  const fetchOnSave = async (helpItem: Help) => {
    const args: MutationUpdateHelpArgs = {
      updateInput: helpItem,
    };

    try {
      const response = await axios.patch("/api/helpers/help", args, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setData((prevData) =>
          prevData.map((item) => (item.id === helpItem.id ? helpItem : item))
        );
      } else {
        throw new Error("Failed to save data");
      }
    } catch (err) {
      // Lanza el error para que toast.promise pueda capturarlo
      throw new Error("Error al guardar");
    }
  };
  const createHelpForm = async () => {
    try {
      const response = await axios.post(
        "/api/helpers/help",
        { createInput: newHelp },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setData((prevData) => [...prevData, response.data.createHelp]);
        setIsCreateModalOpen(false);
        setNewHelp({ url: "", description: "", outlineId: "" });
        toast.success("New help item created successfully");
      } else {
        throw new Error("Failed to create new help item");
      }
    } catch (err: any) {
      let errorMessage = "Error creating new help item";

      if (axios.isAxiosError(err) && err.response) {
        // Si es un error de Axios con una respuesta del servidor
        errorMessage = err.response.data.error || errorMessage;
      } else if (err instanceof Error) {
        // Si es un error de JavaScript estándar
        errorMessage = err.message;
      }

      toast.error(errorMessage);
      console.error("Error creating new help item:", err);
    }
  };

  if (authLoading) {
    return <div>Loading authentication...</div>;
  }

  if (!isLoggedIn()) {
    return null; // The useEffect will handle redirection
  }

  // if (isLoading) {
  //   return <div>Loading data...</div>;
  // }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-grow p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={goBack}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-semibold">Configuracion</h2>
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu
                trigger={
                  <Button variant="outline" className="text-sm font-medium">
                    {stateFilter === "all"
                      ? "Todos los estados"
                      : stateConfig[stateFilter].label}
                  </Button>
                }
                contentSide="left"
                content={(closeMenu) => (
                  <>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => {
                        setStateFilter("all");
                        closeMenu();
                      }}
                    >
                      Todos los estados
                    </a>
                    {Object.entries(stateConfig).map(
                      ([state, { label, color }]) => (
                        <a
                          key={state}
                          href="#"
                          className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${color}`}
                          onClick={() => {
                            setStateFilter(state as StateHelp);
                            closeMenu();
                          }}
                        >
                          {label}
                        </a>
                      )
                    )}
                  </>
                )}
              />
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search in all fields..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-10 pr-4 py-2 w-64"
                />
              </div>

              <Button
                variant="outline"
                size="default"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create New Help
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <TableAdmin
              stateFilter="all"
              data={data}
              onSave={(e) => {
                console.log("Saving", e);
                toast.promise(fetchOnSave(e), {
                  loading: "Guardando...",
                  success: "Guardado",
                  error: "Error al guardar",
                });
              }}
              isLoading={isLoading}
            />
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
              disabled={pageIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex((old) => old + 1)}
              disabled={data.length < pageSize}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Help</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                value={newHelp.url}
                onChange={(e) =>
                  setNewHelp({ ...newHelp, url: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newHelp.description}
                onChange={(e) =>
                  setNewHelp({
                    ...newHelp,
                    description: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="outlineId" className="text-right">
                Outline ID
              </Label>
              <Input
                id="outlineId"
                value={newHelp.outlineId}
                onChange={(e) =>
                  setNewHelp({ ...newHelp, outlineId: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsCreateModalOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button onClick={createHelpForm}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
