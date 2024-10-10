import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import getCabins from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import { StyledTable } from "../../ui/Table";
import CabinRow from "./CabinRow.jsx";
import { useCabinData } from "./useCabinData";
import { Table } from "../../../final-2-after-supabase/src/ui/Table.jsx";
import { useSearchParams } from "react-router-dom";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  // const {
  //   isLoading,
  //   data: cabins,
  //   error,
  // } = useQuery({
  //   queryKey: ["cabin"],
  //   queryFn: getCabins,
  // });

  const { cabins, isLoading, error } = useCabinData();
  const [searchParams, setSearchParams] = useSearchParams();
  const parameter = searchParams.get("DiscountFilter") || "all";
  const sortParameter = searchParams.get("SortBy") || "name-asc"
  const [name, operation] = sortParameter.split("-")

  
  
  if (isLoading) return <Spinner />;

  //Filter Operation
  let FilteredResult;

  if (parameter === "all") FilteredResult = cabins;
  if (parameter === "no-discount")
    FilteredResult = cabins.filter((cabin) => cabin.discount === 0);
  if (parameter === "with-discount")
    FilteredResult = cabins.filter((cabin) => cabin.discount > 0);

  //Sort Operation
  const dynamicSort = (array, key, operation) => {
    const order = operation === "asc" ? 1 : -1
    return array.sort((a, b) => {
      if (a[key] < b[key]) return -1 * order;
      if (a[key] > b[key]) return 1 * order;
      return 0;
    });
  };

  const sortedData = dynamicSort(FilteredResult, name, operation)
  FilteredResult = sortedData
  

  


  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={FilteredResult}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;

// return (
//   <StyledTable columns="9.6rem 0.8fr 2fr 1fr 1fr 3.2rem">
//     <TableHeader>
//       <div></div>
//       <div>Cabin</div>
//       <div>Capacity</div>
//       <div>Price</div>
//       <div>Discount</div>
//       <div></div>
//     </TableHeader>
//     {cabins.map(cabin => <CabinRow cabin={cabin} key={cabin.id}/>)}
//   </StyledTable>
// );
