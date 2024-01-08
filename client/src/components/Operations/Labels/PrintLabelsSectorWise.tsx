import { inflateSync } from "zlib";
import './PrintLabelsSectorWise.css';

export const generatePrintableLabels = (overrideDetails) => {
    let tableRows = ''; // Initialize an empty string to store table rows

    // Loop through each sector in overrideDetails and create table rows
    Object.keys(overrideDetails).forEach((key, index) => {
        const sector = overrideDetails[key];

        // Check the value of sector.count
        const count = parseInt(sector.count); // Convert count to an integer

        if (count === 0) {
            // If count is 0, don't print the label
            return; // Skip this iteration
        } else {
            // Determine the color based on packageType
            let color = '';
            let rowStyle = ''; // Inline style for table row
            let cellStyle = ''; // Inline style for table cell


            // Determine CSS classes based on index (row number)
            if (index === 0) {
                rowStyle = 'font-weight: bold; font-size: 30px;'; // Apply bold and font size 30 to first row
            } else if (index === 1) {
                rowStyle = 'font-size: 30px;'; // Apply font size 30 to second row
            } else {
                rowStyle = 'font-size: 10px;'; // Apply font size 10 to other rows
            }

            if (sector.packageType === 'Medium') {
                color = 'WHITE';
            } else if (sector.packageType === 'Regular') {
                color = 'GREY';
            } else if (sector.packageType === 'Single') {
                color = 'SINGLE';
            } else {
                // Handle other packageType values if needed
                color = 'UNKNOWN'; // Default value for unknown types
            }

            // If count is 1 or greater, print the label based on the count value
            for (let i = 0; i < count; i++) {
                // Create a table row with table cells for each detail
                tableRows += `
                <div class ="print-div ">
                    <table border="1" cellpadding="0" cellspacing="0" >
                        <tbody>
                            <tr >
                                <td COLSPAN=2 align="center" >${sector.jamaatId}</td>
                            </tr>
                            <tr >
                                <td COLSPAN=2 align="center">${sector.firstName} ${sector.lastName}</td>
                            </tr>
                            <tr >
                                <td align="center" style="font-size: 20px;"> ${sector.sector}</td>
                                <td align="center" style="font-size: 20px;">${color}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                `;
            }
        }
    });
    // Create the complete HTML table with headers and rows
    const table = `
                ${tableRows} <!-- Insert generated table rows -->
  
    `;

    return table; // Return the complete HTML table
};

export const handlePrint = (overrideDetails) => {
    const printableLabels = generatePrintableLabels(overrideDetails);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
        <html>
        <head>
          <title>A4 Page Using CSS</title>
          <style>
          .print-div {
            width: 100mm; /* Width is now the height in landscape */
            height: 60mm; /* Height is now the width in landscape */
            page-break-after: always;
            margin: 0;
            padding: 10px; /* Padding added on all sides */
            transform: rotate(-90deg) translateX(-100%);
            transform-origin: top left;
          }
          .print-div table {
            width: 100%; /* Adjusting table width considering padding */
            height: 100%; /* Adjusting table height considering padding */
            border-collapse: collapse;
          }
          .print-div table td {
            border: 1px solid black;
            text-align: center;
          }
          .print-div table td:nth-child(1) {
            font-size: 50px;
            font-weight: bold;
          }
          .print-div table td:nth-child(2) {
            font-size: 40px;
            font-weight: bold;
          }
          .print-div table td:nth-child(3),
          .print-div table td:nth-child(4) {
            font-size: 20px;
          }
        }
            </style>
        </head>
        <body>${printableLabels}</body>
      </html>
        </html>
    `);
        printWindow.document.close();
        printWindow.focus();

        // Wait for the content to load before printing
        printWindow.print();
        // printWindow.close(); // Close the window after printing

    } else {
        console.log('Could not open new window for printing');
    }

};

