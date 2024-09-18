import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import getCabins from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import { StyledTable } from "../../ui/Table";
import CabinRow from "./CabinRow.jsx"
import { useCabinData } from "./useCabinData";

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

  const {cabins, isLoading, error} = useCabinData()
  
  if (isLoading) return <Spinner />;

  return (
    <StyledTable columns="9.6rem 0.8fr 2fr 1fr 1fr 3.2rem">
      <TableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map(cabin => <CabinRow cabin={cabin} key={cabin.id}/>)}
    </StyledTable>
  );
}

export default CabinTable;
