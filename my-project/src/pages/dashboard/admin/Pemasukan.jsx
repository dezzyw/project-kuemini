import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pemasukan = ({ onTotalPemasukanChange, onJumlahPesananChange, hiddenTable = false }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' for ascending, 'desc' for descending

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('http://localhost:6001/payment/transactions');
        if (Array.isArray(res.data)) {
          setTransactions(res.data);
          setFilteredTransactions(res.data); // Initially show all transactions
        } else {
          console.error('Respon bukan array:', res.data);
          setTransactions([]);
          setFilteredTransactions([]);
        }
      } catch (error) {
        console.error('Gagal fetch data transaksi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const totalPemasukan = filteredTransactions.reduce((total, tx) => {
    return total + (Number(tx.grossAmount) || 0);
  }, 0);

  useEffect(() => {
    if (typeof onTotalPemasukanChange === 'function') {
      onTotalPemasukanChange(totalPemasukan);
    }
    if (typeof onJumlahPesananChange === 'function') {
      onJumlahPesananChange(filteredTransactions.length);
    }
  }, [totalPemasukan, filteredTransactions.length, onTotalPemasukanChange, onJumlahPesananChange]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    const filteredData = transactions.filter((tx) => {
      return (
        tx.customerName.toLowerCase().includes(value.toLowerCase()) ||
        tx.customerEmail.toLowerCase().includes(value.toLowerCase()) ||
        tx.transactionStatus.toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilteredTransactions(filteredData);
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sortedData = [...filteredTransactions].sort((a, b) => {
      if (order === 'asc') {
        return Number(a.grossAmount) - Number(b.grossAmount); // Sort ascending
      } else {
        return Number(b.grossAmount) - Number(a.grossAmount); // Sort descending
      }
    });

    setFilteredTransactions(sortedData);
  };

  if (hiddenTable) return null; // 👈 ini buat dashboard, langsung keluarin null

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Daftar Transaksi</h2>

      <div className="text-right text-gray-800 font-medium">
            Total Pemasukan:{' '}
            <span className="font-bold text-green-600">
              Rp {totalPemasukan.toLocaleString('id-ID')}
            </span>
          </div>

      <div className="mb-4 flex items-center">
        <label htmlFor="sortOrder" className="mr-2 text-sm">Sort by Jumlah:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="desc">Besar - Kecil</option>
          <option value="asc">Kecil - Besar</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredTransactions.length === 0 ? (
        <p className="text-gray-500">Tidak ada data transaksi yang sesuai dengan filter.</p>
      ) : (
        <>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-3 py-2 text-left">ID Transaksi</th>
                  <th className="px-3 py-2 text-left">Nama</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Total</th>
                  <th className="px-3 py-2 text-left">Waktu</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx, idx) => (
                  <tr key={idx} className="border-t text-sm">
                    <td className="px-3 py-2">{tx.orderId || '-'}</td>
                    <td className="px-3 py-2">{tx.customerName || '-'}</td>
                    <td className="px-3 py-2">{tx.customerEmail || '-'}</td>
                    <td className="px-3 py-2">Rp {Number(tx.grossAmount).toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2">{new Date(tx.transactionTime).toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2">{tx.transactionStatus || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </>
      )}
    </div>
  );
};

export default Pemasukan;
