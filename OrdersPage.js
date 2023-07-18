import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, BackHandler, ToastAndroid } from "react-native";
import styled from "styled-components/native";
import { Picker } from '@react-native-picker/picker';

const pageSize = 5; // Number of items to load per page

const OrdersPage = () => {
  const [selectedShipToParty, setSelectedShipToParty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedData, setLoadedData] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const [isCardOpen, setIsCardOpen] = useState(false); // Track card toggle state
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false); // Track back button press


  const ordersData = [
    {"id": 1, "creationDate": "2023-06-01", "ecomOrderNo": "ECOM123", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 2, "creationDate": "2023-06-02", "ecomOrderNo": "ECOM124", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 3, "creationDate": "2023-06-03", "ecomOrderNo": "ECOM125", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 4, "creationDate": "2023-06-04", "ecomOrderNo": "ECOM126", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 5, "creationDate": "2023-06-05", "ecomOrderNo": "ECOM127", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 6, "creationDate": "2023-06-06", "ecomOrderNo": "ECOM128", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 7, "creationDate": "2023-06-07", "ecomOrderNo": "ECOM129", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 8, "creationDate": "2023-06-08", "ecomOrderNo": "ECOM130", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 9, "creationDate": "2023-06-08", "ecomOrderNo": "ECOM131", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 10, "creationDate": "2023-06-10", "ecomOrderNo": "ECOM132", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 11, "creationDate": "2023-06-11", "ecomOrderNo": "ECOM133", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 12, "creationDate": "2023-06-12", "ecomOrderNo": "ECOM134", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 13, "creationDate": "2023-06-13", "ecomOrderNo": "ECOM135", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 14, "creationDate": "2023-06-14", "ecomOrderNo": "ECOM136", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 15, "creationDate": "2023-06-15", "ecomOrderNo": "ECOM137", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 16, "creationDate": "2023-06-16", "ecomOrderNo": "ECOM138", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 17, "creationDate": "2023-06-17", "ecomOrderNo": "ECOM139", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 18, "creationDate": "2023-06-18", "ecomOrderNo": "ECOM140", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 19, "creationDate": "2023-06-19", "ecomOrderNo": "ECOM141", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 20, "creationDate": "2023-06-20", "ecomOrderNo": "ECOM142", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 21, "creationDate": "2023-06-21", "ecomOrderNo": "ECOM143", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 22, "creationDate": "2023-06-22", "ecomOrderNo": "ECOM144", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 23, "creationDate": "2023-06-23", "ecomOrderNo": "ECOM145", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 24, "creationDate": "2023-06-24", "ecomOrderNo": "ECOM146", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 25, "creationDate": "2023-06-25", "ecomOrderNo": "ECOM147", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 26, "creationDate": "2023-06-26", "ecomOrderNo": "ECOM148", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 27, "creationDate": "2023-06-27", "ecomOrderNo": "ECOM149", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 28, "creationDate": "2023-06-28", "ecomOrderNo": "ECOM150", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 29, "creationDate": "2023-06-29", "ecomOrderNo": "ECOM151", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "ABC Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 30, "creationDate": "2023-06-30", "ecomOrderNo": "ECOM152", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "ABC Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
      
      // MNO Company (50 entries)
    {"id": 31, "creationDate": "2023-06-01", "ecomOrderNo": "ECOM160", "poNumber": "PO999", "sapOrderNo": "SAP222", "netValue": "$150", "status": "Pending", "shipToParty": "MNO Company", "buyer": "Robert Green", "noOfLinesDelivered": 1, "materialNumber": "M555", "brand": "Brand A", "quantity": 15, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 10, "lineStatus": "Delivered", "customerCode": "C031"},
    {"id": 32, "creationDate": "2023-06-02", "ecomOrderNo": "ECOM161", "poNumber": "PO888", "sapOrderNo": "SAP111", "netValue": "$300", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Sarah Thompson", "noOfLinesDelivered": 4, "materialNumber": "M666", "brand": "Brand B", "quantity": 25, "unitValue": "$12", "deliveredQty": 15, "balanceQty": 10, "lineStatus": "Processing", "customerCode": "C032"},
    {"id": 33, "creationDate": "2023-06-03", "ecomOrderNo": "ECOM162", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 34, "creationDate": "2023-06-04", "ecomOrderNo": "ECOM163", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 35, "creationDate": "2023-06-05", "ecomOrderNo": "ECOM164", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 36, "creationDate": "2023-06-06", "ecomOrderNo": "ECOM165", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 37, "creationDate": "2023-06-07", "ecomOrderNo": "ECOM166", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 38, "creationDate": "2023-06-08", "ecomOrderNo": "ECOM167", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 39, "creationDate": "2023-06-08", "ecomOrderNo": "ECOM168", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 40, "creationDate": "2023-06-10", "ecomOrderNo": "ECOM169", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 41, "creationDate": "2023-06-11", "ecomOrderNo": "ECOM170", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 42, "creationDate": "2023-06-12", "ecomOrderNo": "ECOM171", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 43, "creationDate": "2023-06-13", "ecomOrderNo": "ECOM172", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 44, "creationDate": "2023-06-14", "ecomOrderNo": "ECOM173", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 45, "creationDate": "2023-06-15", "ecomOrderNo": "ECOM174", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 46, "creationDate": "2023-06-16", "ecomOrderNo": "ECOM175", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 47, "creationDate": "2023-06-17", "ecomOrderNo": "ECOM176", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 48, "creationDate": "2023-06-18", "ecomOrderNo": "ECOM177", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 49, "creationDate": "2023-06-19", "ecomOrderNo": "ECOM178", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 50, "creationDate": "2023-06-20", "ecomOrderNo": "ECOM179", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 51, "creationDate": "2023-06-21", "ecomOrderNo": "ECOM180", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 52, "creationDate": "2023-06-22", "ecomOrderNo": "ECOM181", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 53, "creationDate": "2023-06-23", "ecomOrderNo": "ECOM182", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 54, "creationDate": "2023-06-24", "ecomOrderNo": "ECOM183", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 55, "creationDate": "2023-06-25", "ecomOrderNo": "ECOM184", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 56, "creationDate": "2023-06-26", "ecomOrderNo": "ECOM185", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 57, "creationDate": "2023-06-27", "ecomOrderNo": "ECOM186", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 58, "creationDate": "2023-06-28", "ecomOrderNo": "ECOM187", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 59, "creationDate": "2023-06-29", "ecomOrderNo": "ECOM188", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 60, "creationDate": "2023-06-30", "ecomOrderNo": "ECOM189", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 61, "creationDate": "2023-06-01", "ecomOrderNo": "ECOM190", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 62, "creationDate": "2023-06-02", "ecomOrderNo": "ECOM191", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 63, "creationDate": "2023-06-03", "ecomOrderNo": "ECOM192", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 64, "creationDate": "2023-06-04", "ecomOrderNo": "ECOM193", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 65, "creationDate": "2023-06-05", "ecomOrderNo": "ECOM194", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 66, "creationDate": "2023-06-06", "ecomOrderNo": "ECOM195", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 67, "creationDate": "2023-06-07", "ecomOrderNo": "ECOM196", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 68, "creationDate": "2023-06-08", "ecomOrderNo": "ECOM197", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 69, "creationDate": "2023-06-08", "ecomOrderNo": "ECOM198", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 70, "creationDate": "2023-06-10", "ecomOrderNo": "ECOM199", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 71, "creationDate": "2023-06-11", "ecomOrderNo": "ECOM200", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 72, "creationDate": "2023-06-12", "ecomOrderNo": "ECOM201", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 73, "creationDate": "2023-06-13", "ecomOrderNo": "ECOM202", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 74, "creationDate": "2023-06-14", "ecomOrderNo": "ECOM203", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 75, "creationDate": "2023-06-15", "ecomOrderNo": "ECOM204", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 76, "creationDate": "2023-06-16", "ecomOrderNo": "ECOM205", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 77, "creationDate": "2023-06-17", "ecomOrderNo": "ECOM206", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 78, "creationDate": "2023-06-18", "ecomOrderNo": "ECOM207", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 79, "creationDate": "2023-06-19", "ecomOrderNo": "ECOM208", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "MNO Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 80, "creationDate": "2023-06-20", "ecomOrderNo": "ECOM209", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "MNO Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
  
      
      // XYZ Company (7 entries)
    {"id": 81, "creationDate": "2023-06-01", "ecomOrderNo": "ECOM211", "poNumber": "PO222", "sapOrderNo": "SAP555", "netValue": "$180", "status": "Pending", "shipToParty": "XYZ Company", "buyer": "Michael Wilson", "noOfLinesDelivered": 2, "materialNumber": "M777", "brand": "Brand C", "quantity": 12, "unitValue": "$15", "deliveredQty": 8, "balanceQty": 4, "lineStatus": "Delivered", "customerCode": "C081"},
    {"id": 82, "creationDate": "2023-06-02", "ecomOrderNo": "ECOM212", "poNumber": "PO333", "sapOrderNo": "SAP444", "netValue": "$250", "status": "Processing", "shipToParty": "XYZ Company", "buyer": "Emily Davis", "noOfLinesDelivered": 3, "materialNumber": "M888", "brand": "Brand D", "quantity": 18, "unitValue": "$14", "deliveredQty": 10, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C082"},
    {"id": 83, "creationDate": "2023-06-03", "ecomOrderNo": "ECOM213", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "XYZ Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 84, "creationDate": "2023-06-04", "ecomOrderNo": "ECOM214", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "XYZ Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 85, "creationDate": "2023-06-05", "ecomOrderNo": "ECOM215", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "XYZ Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
    {"id": 86, "creationDate": "2023-06-06", "ecomOrderNo": "ECOM216", "poNumber": "PO789", "sapOrderNo": "SAP123", "netValue": "$200", "status": "Processing", "shipToParty": "XYZ Company", "buyer": "Jane Smith", "noOfLinesDelivered": 3, "materialNumber": "M456", "brand": "Brand Y", "quantity": 20, "unitValue": "$8", "deliveredQty": 12, "balanceQty": 8, "lineStatus": "Processing", "customerCode": "C002"},
    {"id": 87, "creationDate": "2023-06-07", "ecomOrderNo": "ECOM217", "poNumber": "PO456", "sapOrderNo": "SAP789", "netValue": "$100", "status": "Pending", "shipToParty": "XYZ Company", "buyer": "John Doe", "noOfLinesDelivered": 2, "materialNumber": "M123", "brand": "Brand X", "quantity": 10, "unitValue": "$10", "deliveredQty": 5, "balanceQty": 5, "lineStatus": "Delivered", "customerCode": "C001"},
   // ... (5 more data entries for XYZ Company)
     
  ];

  const shipToParties = Array.from(
    new Set(ordersData.map((order) => order.shipToParty))
  );

  useEffect(() => {
    // Fetch data for the current page
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Fetch data for the selected shipToParty
    fetchData(1);
  }, [selectedShipToParty]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
  
    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    if (isCardOpen) {
      // If the card is open, toggle and close it
      toggleCardExpansion(expandedCardId);
      return true; // Prevent default back button behavior
    }
  };


    const fetchData = async (page) => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const newData = ordersData.filter(
        (order) =>
          selectedShipToParty === null ||
          selectedShipToParty === "All" ||
          order.shipToParty === selectedShipToParty
      ).slice(startIndex, endIndex);

    setLoading(true); // Set loading state to true

    // Simulate an asynchronous API call
    await fetchNewData(newData);

    if (page === 1) {
      setLoadedData(newData);
    } else {
      setLoadedData((prevData) => [...prevData, ...newData]);
    }

    setLoading(false); // Set loading state to false
  };

  const fetchNewData = async (data) => {
    // Simulate an asynchronous API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Perform any additional data processing or API requests here
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const scrollPosition = layoutMeasurement.height + contentOffset.y;
    const twoThirdsPosition = (2 / 3) * contentSize.height;
  
    if (scrollPosition >= twoThirdsPosition && !loading) {
      // User has reached 2/3 of the page
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const toggleCardExpansion = (cardId) => {
    if (expandedCardId === cardId && isCardOpen) {
      // If the card is already open, toggle and close it
      setIsCardOpen(false);
      setExpandedCardId(null);
    } else {
      // If the card is closed or a different card is open, toggle and open the selected card
      setIsCardOpen(true);
      setExpandedCardId(cardId);
    }
  };

  useEffect(() => {
    if (selectedShipToParty !== null && !loadedData.some(order => order.shipToParty === selectedShipToParty)) {
      // If the selected shipToParty option is not loaded, fetch the data for it
      fetchData(1);
    }
  }, [selectedShipToParty, loadedData]);

  return (
    <ScrollView decelerationRate={0.5} onScroll={handleScroll}>
      <DropdownContainer>
        <DropdownLabel>Customers:</DropdownLabel>
        <DropdownSelect
          selectedValue={selectedShipToParty}
          onValueChange={(value) => setSelectedShipToParty(value)}
          style={{ color: "black", paddingRight: 20 }}
          dropdownIconColor="black"
        >
          <DropdownOption label="All" value={null} />
          {shipToParties.map((party) => (
            <DropdownOption key={party} label={party} value={party} />
          ))}
        </DropdownSelect>
      </DropdownContainer>
      <ScrollContainer>
     
         {
          loadedData
          .filter(
            (order) =>
              selectedShipToParty === null ||
              selectedShipToParty === "All" ||
              order.shipToParty === selectedShipToParty
          )
          .map((order) => (
            <CardContainer
              key={order.id}
              onPress={() => toggleCardExpansion(order.id)}
              activeOpacity={0.8}
              expanded={expandedCardId === order.id}
            >
              <CardContent>
                <CardLabel>EcomOrderNo:</CardLabel>
                <OrderNoText>{order.ecomOrderNo}</OrderNoText>
              </CardContent>

              <CardContent>
                <CardLabel>Creation Date:</CardLabel>
                <CreationDateText>{order.creationDate}</CreationDateText>
              </CardContent>

              <CardContent>
                <CardLabel>Net Value:</CardLabel>
                <NetValueText>{order.netValue}</NetValueText>
              </CardContent>

              <CardContent>
                <CardLabel>Order Status:</CardLabel>
                <StatusText>{order.status}</StatusText>
              </CardContent>

              {expandedCardId === order.id && (
                <DetailsContainer>
                  <DetailLabel>Ship To Party:</DetailLabel>
                  <DetailValue>{order.shipToParty}</DetailValue>

                  <DetailLabel>Buyer:</DetailLabel>
                  <DetailValue>{order.buyer}</DetailValue>

                  <DetailLabel>No. of Lines Delivered:</DetailLabel>
                  <DetailValue>{order.noOfLinesDelivered}</DetailValue>

                  <DetailLabel>Material Number:</DetailLabel>
                  <DetailValue>{order.materialNumber}</DetailValue>

                  <DetailLabel>Brand:</DetailLabel>
                  <DetailValue>{order.brand}</DetailValue>

                  <DetailLabel>Quantity:</DetailLabel>
                  <DetailValue>{order.quantity}</DetailValue>

                  <DetailLabel>Unit Value:</DetailLabel>
                  <DetailValue>{order.unitValue}</DetailValue>

                  <DetailLabel>Delivered Qty:</DetailLabel>
                  <DetailValue>{order.deliveredQty}</DetailValue>

                  <DetailLabel>Balance Qty:</DetailLabel>
                  <DetailValue>{order.balanceQty}</DetailValue>

                  <DetailLabel>Line Status:</DetailLabel>
                  <DetailValue>{order.lineStatus}</DetailValue>
                </DetailsContainer>
              )}
            </CardContainer>
          ))}
        {loading && (
          <View style={{ alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#005DA9" />
          </View>
        )}
      </ScrollContainer>
    </ScrollView>
  );
};



const ScrollContainer = styled(View)`
  padding: 16px;
`;

const CardContainer = styled(TouchableOpacity)`
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  elevation: 2;
  ${(props) =>
    props.expanded &&
    `
    border: 2px solid blue;
  `}
`;

const CardContent = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

const CardLabel = styled(Text)`
  flex: 1;
  font-size: 12px;
  font-weight: bold;
  color: #808080;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const OrderNoText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000000;
`;

const CreationDateText = styled(Text)`
  font-size: 14px;
  margin-bottom: 4px;
  color: #000000;
`;

const NetValueText = styled(Text)`
  font-size: 14px;
  margin-bottom: 4px;
  color: #000000;
`;

const StatusText = styled(Text)`
  font-size: 14px;
  color: blue;
  font-weight: bold;
`;

const DetailsContainer = styled(View)`
  margin-top: 16px;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

const DetailLabel = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: #808080;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const DetailValue = styled(Text)`
  font-size: 15px;
  margin-bottom: 8px;
  color: #000000;
`;

const DropdownContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: 16px;
  background-color: #ffffff;
`;

const DropdownLabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
  color: black;
`;

const DropdownSelect = styled(Picker)`
  flex: 1;
`;

const DropdownOption = styled(Picker.Item)``;

export default OrdersPage;