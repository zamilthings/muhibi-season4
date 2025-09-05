import { fetchRecords } from "@/utils/airtableService";
import React, { useState, useEffect } from "react";
import Carousel from "./components/Embla";
import { Loader } from "lucide-react";

function Results() {
  const [resultList, setResultList] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // Fetch programs
        const tableName = "Published Programs";
        const filterBy = "";
        const sortField = "auto";
        const sortDirection = "desc";
        const maxRecords = 4;
        const programs = await fetchRecords(
          tableName,
          filterBy,
          sortField,
          sortDirection,
          maxRecords
        );

        // Fetch results for each program
        const resultsPromises = programs.map(async (program) => {
          const tableName = "Result";
          const filterBy = `{Program} = '${program.fields.Name}'`;
          const sortField = "Place";
          const sortDirection = 'asc';
          const results = await fetchRecords(
            tableName,
            filterBy,
            sortField,
            sortDirection
          );
          // console.log(results);

          return {
            ProgramCategory: program.fields.Category,
            programName: program.fields.Name,
            records: results,
            stage: results[0]?.fields.Stage,
          };
        });

        const resultsList = await Promise.all(resultsPromises);
        setResultList(resultsList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold md:text-4xl text-center capitalize mb-16'>Result</h1>
      <div className="flex flex-col">
        {!Loading && resultList.length === 0 && (
          <p className="text-center mt-4 font-semibold">No results found</p>
        )}
        {Loading ? (
          <p className="flex items-center justify-center gap-2 mx-auto w-full my-4 min-h-[200px]">Loading <Loader className="animate-spin" /></p>
        ) : (
          <Carousel slides={resultList} />
        )}

      </div>
    </div>
  );
}

export default Results;
