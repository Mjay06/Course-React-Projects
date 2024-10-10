//import SortBy from '../../ui/SortBy';

import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';




function CabinTableOperations(){
  const Filterdata = [{Label: "All", Value:"all"}, {Label: "No Discount", Value: "no-discount"}, {Label: "With Discount", Value: "with-discount"}]


  const options = [
    { value: "name-asc", label: "sort by name [A-Z]" },
    { value: "name-desc", label: "sort by name [Z-A]" },
    { value: "regularPrice-asc", label: "sort by Price [Low first]" },
    { value: "regularPrice-desc", label: "sort by Price [High first]" },
    { value: "maxCapacity-asc", label: "sort by Capacity [Low first]" },
    { value: "maxCapacity-desc", label: "sort by Capacity [High first]" }
];
  return <TableOperations>
    <Filter FilterField={"DiscountFilter"} FilterData={Filterdata} />
    <SortBy options={options} />
  </TableOperations>
}

// function CabinTableOperations() {
//   return (
//     <TableOperations>
//       {/* We could do these two as compound components as well, but let's keep it simple, and let's also explore different ways of achieving the same thing */}
//       <Filter
//         filterField='discount'
//         options={[
//           { value: 'all', label: 'All' },
//           { value: 'no-discount', label: 'No discount' },
//           { value: 'with-discount', label: 'With discount' },
//         ]}
//       />

//       <SortBy
//         options={[
//           { value: 'name-asc', label: 'Sort by name (A-Z)' },
//           { value: 'name-desc', label: 'Sort by name (Z-A)' },
//           { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
//           {
//             value: 'regularPrice-desc',
//             label: 'Sort by price (high first)',
//           },
//           { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
//           {
//             value: 'maxCapacity-desc',
//             label: 'Sort by capacity (high first)',
//           },
//         ]}
//       />
//     </TableOperations>
//   );
// }

export default CabinTableOperations;
