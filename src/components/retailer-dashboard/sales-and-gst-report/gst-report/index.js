import React from 'react'
import DataTable from 'react-data-table-component';
import { Button } from 'reactstrap';
import { CSVLink } from "react-csv";
import { useSelector } from 'react-redux';

const GSTReport = () => {
    const { gst_report_table_data } = useSelector(state => state.ComponentPropsManagement)

    const columns = [
        {
            name: 'HSN Code',
            selector: row => row.hsn_code,
        },
        {
            name: 'Business Date',
            selector: row => row.business_date,
        },
        {
            name: 'Tax',
            selector: row => row.taxable_value,
        },
        {
            name: 'IGST',
            selector: row => row.igst,
        },
        {
            name: 'CGST',
            selector: row => row.cgst,
        },
        {
            name: 'SGST',
            selector: row => row.sgst,
        },
        {
            name: 'CESS',
            selector: row => row.cess,
        },
        {
            name: 'Additional Cess',
            selector: row => row.additional_cess,
        },
        {
            name: 'Flood Cess',
            selector: row => row.flood_cess,
        },
        {
            name: 'Total',
            selector: row => row.total_value,
        },
    ];

    const actionsMemo = React.useMemo(() => {
        return (<>
            <CSVLink data={gst_report_table_data}>
                <Button className='btn btn-sm' style={{ backgroundColor: "var(--primary1)", border: "none" }}>
                    Export
                </Button>
            </CSVLink>
        </>)
    }, []);

    return (<>
        <DataTable
            columns={columns}
            responsive={true}
            data={gst_report_table_data}
            title="GST Report"
            actions={actionsMemo}
        />
    </>)
}

export default GSTReport