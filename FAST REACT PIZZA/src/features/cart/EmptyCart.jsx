import Linkbutton from '../../ui/Linkbutton';

function EmptyCart() {
  return (
    <div className='px-6 py-8'>
      <Linkbutton to="/menu">&larr; Back to menu</Linkbutton>


      <p className='font-bold mt-8'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
