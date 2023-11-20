import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: payments =[] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <div className="overflow-x-auto p-6 mt-12 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold py-4">
          TOTAL Payment: {payments.length}
        </h2>
        <table className="table ">
          {/* head */}
          <thead className="bg-orange-400 rounded-lg">
            <tr className="text-center">
              <th>#</th>
              <th>Email</th>
              <th>Price</th>
              <th className="">Transaction Id</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr className="text-center" key={payment._id}>
                <td>{idx + 1}</td>
                <th>
                <p>{payment.email}</p>
                </th>
                <th>
                ${payment.price}
                </th>
                <th>
                  ${payment.transactionId}
                </th>
                <th>
                  {payment.status}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default PaymentHistory;