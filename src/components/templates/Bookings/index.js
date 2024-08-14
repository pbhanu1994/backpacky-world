import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import NextLink from "next/link";
import _ from "lodash";
import {
  Container,
  Box,
  Tab,
  Tabs,
  Button,
  Table,
  Stack,
  Switch,
  Divider,
  MenuItem,
  TableBody,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from "@mui/material";
import DashboardLayout from "../../layouts/dashboard";
import Page from "../../atoms/Page";
import Label from "../../atoms/Label";
import Iconify from "../../atoms/Iconify";
import HeaderBreadcrumbs from "../../atoms/HeaderBreadCrumbs";
import Scrollbar from "../../atoms/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableSearchNotFound,
} from "../../atoms/table";
import FlightsBookingsTableRowSkeleton from "./FlightsBookingsTableRowSkeleton";
import HotelsBookingsTableRowSkeleton from "./HotelsBookingsTableRowSkeleton";
import FlightsBookingsTableToolbar from "./FlightsBookingsTableToolbar";
import FlightsBookingsTableRow from "./FlightsBookingsTableRow";
import HotelsBookingsTableToolbar from "./HotelsBookingsTableToolbar";
import HotelsBookingsTableRow from "./HotelsBookingsTableRow";
import useSettings from "../../../hooks/useSettings";
import useTabs from "../../../hooks/useTabs";
import useTable, { getComparator, emptyRows } from "../../../hooks/useTable";
import { LOADING_STATES } from "../../../constants/loadingStates";
import { PAGE_PATH } from "../../../constants/navigationConstants";
import { TICKETING_AGREEMENT_OPTION_TYPE } from "../../../constants/flightBooking";
import getFlightBookings from "../../../store/actions/book/flights/bookings/getFlightBookings";
import deleteFlightBooking from "../../../store/actions/book/flights/bookings/deleteFlightBooking";
import getHotelBookings from "../../../store/actions/book/hotels/bookings/getHotelBookings";
import deleteHotelBooking from "../../../store/actions/book/hotels/bookings/deleteHotelBooking";
import setAndShowDeleteDialog from "../../../store/actions/config/dialog/setAndShowDeleteDialog";

const Bookings = () => {
  const dispatch = useDispatch();
  const [flightLoadingState, setFlightLoadingState] = useState(
    LOADING_STATES.INITIAL
  );
  const [hotelLoadingState, setHotelLoadingState] = useState(
    LOADING_STATES.INITIAL
  );

  const flightBookings = useSelector(
    (state) => state.book?.flights?.bookings ?? {}
  );
  const hotelBookings = useSelector(
    (state) => state.book?.hotels?.bookings ?? {}
  );

  useEffect(() => {
    // If bookings are empty and not in loading state, start fetching
    if (!_.isEmpty(flightBookings)) {
      setFlightLoadingState(LOADING_STATES.LOADED);
    } else {
      setFlightLoadingState(LOADING_STATES.LOADING);
      dispatch(getFlightBookings())
        .then(() => {
          // Check if flightBookings is still empty after fetching
          if (_.isEmpty(flightBookings)) {
            setFlightLoadingState(LOADING_STATES.NO_RESULTS);
          } else {
            setFlightLoadingState(LOADING_STATES.LOADED);
          }
        })
        .catch(() => setFlightLoadingState(LOADING_STATES.ERROR));
    }

    if (!_.isEmpty(hotelBookings)) {
      setHotelLoadingState(LOADING_STATES.LOADED);
    } else {
      setHotelLoadingState(LOADING_STATES.LOADING);
      dispatch(getHotelBookings())
        .then(() => {
          // Check if hotelBookings is still empty after fetching
          if (_.isEmpty(hotelBookings)) {
            setHotelLoadingState(LOADING_STATES.NO_RESULTS);
          } else {
            setHotelLoadingState(LOADING_STATES.LOADED);
          }
        })
        .catch(() => setHotelLoadingState(LOADING_STATES.ERROR));
    }
  }, [
    dispatch,
    flightBookings,
    hotelBookings,
    flightLoadingState,
    hotelLoadingState,
  ]);

  const { themeStretch } = useSettings();
  const { push } = useRouter();

  const flightBookingData = Object.values(flightBookings);
  const hotelBookingData = Object.values(hotelBookings);

  // Constructing Flights Bookings Data for Table
  const flightData = flightBookingData.map((data) => ({
    bookingRef: data.bookingConfirmation.associatedRecords[0].reference,
    createdDate: data.bookingConfirmation.associatedRecords[0].creationDate,
    passengers: data.travelers.map(
      (traveler) => `${traveler.name.firstName} ${traveler.name.lastName}`
    ),
    flightSegments: data.flightOffers[0].itineraries[0].segments.map(
      (segment) =>
        `${segment.departure.iataCode}::FLIGHT_ICON::${segment.arrival.iataCode}::NEW_LINE::(${segment.carrierCode}${segment.aircraft.code})`
    ),
    departureCity: data?.fromDetails?.name,
    arrivalCity: data?.toDetails?.name,
    departureDate: data.flightOffers[0].itineraries[0].segments[0].departure.at,
    returnDate: data?.searchParams?.returnDate,
    ticketingAgreementOption:
      data.bookingConfirmation.ticketingAgreement.option,
    download: data.download,
  }));

  // Constructing Hotels Bookings Data for Table
  const hotelData = hotelBookingData.map((data) => ({
    bookingRef: data.bookingConfirmation[0].associatedRecords[0].reference,
    createdAt: new Date(
      data.createdAt.seconds * 1000 +
        Math.floor(data.createdAt.nanoseconds / 1e6)
    ),
    guests: data.guests.map(
      (guest) => `${guest.name.firstName} ${guest.name.lastName}`
    ),
    hotelName: data.hotelDetails.name,
    city: data?.destinationDetails?.name,
    checkInDate: data.hotelDetails.checkInDate,
    checkOutDate: data.hotelDetails.checkOutDate,
    download: data.download,
  }));

  // Filter Flight Booking States
  const [filterFlightKeyword, setFilterFlightKeyword] = useState("");
  const [filterFlightStatus, setFilterFlightStatus] = useState(
    TICKETING_AGREEMENT_OPTION_TYPE.CONFIRM
  );
  const [filterFlightDepartureDate, setFilterDepartureDate] = useState(null);
  const [filterFlightReturnDate, setFilterReturnDate] = useState(null);

  // Filter Hotel Booking States
  const [filterHotelKeyword, setFilterHotelKeyword] = useState("");
  const [filterCheckInDate, setFilterCheckInDate] = useState(null);
  const [filterCheckOutDate, setFilterCheckOutDate] = useState(null);

  const TABS = [
    {
      value: "flights",
      label: "Flights",
      icon: <Iconify icon={"mdi:flight"} width={20} height={20} />,
      count: Object.keys(flightBookings).length,
    },
    {
      value: "hotels",
      label: "Hotels",
      icon: <Iconify icon={"mdi:hotel"} width={20} height={20} />,
      count: Object.keys(hotelBookings).length,
    },
  ];

  const FLIGHTS_TABLE_HEAD = [
    { id: "bookingRef", label: "Booking Ref", align: "left" },
    { id: "createDate", label: "Created", align: "left" },
    { id: "passengers", label: "Passengers", align: "left" },
    { id: "flightSegments", label: "Flight Segments", align: "left" },
    { id: "departureCity", label: "Departure City", align: "left" },
    { id: "arrivalCity", label: "Arrival City", align: "left" },
    { id: "departureDate", label: "Departure Date", align: "left" },
    { id: "returnDate", label: "Return Date", align: "left" },
    // { id: "seatNumbers", label: "Seat Numbers", align: "left"},
    { id: "status", label: "Status", align: "left" },
    { id: "", label: "", align: "left" },
  ];

  const HOTELS_TABLE_HEAD = [
    { id: "bookingRef", label: "Booking Ref", align: "left" },
    { id: "createDate", label: "Created", align: "left" },
    { id: "guests", label: "Guests", align: "left" },
    { id: "hotelName", label: "Hotel Name", align: "left" },
    { id: "city", label: "City", align: "left" },
    { id: "checkInDate", label: "Check-in Date", align: "left" },
    { id: "checkOutDate", label: "Check-out Date", align: "left" },
    // { id: "status", label: "Status", align: "left" },
    { id: "", label: "", align: "left" },
  ];

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } =
    useTabs("flights");

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: "createDate" });

  const applySortFilterForFlightsBookings = ({
    flightData,
    comparator,
    filterFlightKeyword,
    filterFlightStatus,
    filterFlightDepartureDate,
    filterFlightReturnDate,
  }) => {
    const stabilizedThis = flightData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    flightData = stabilizedThis.map((el) => el[0]);

    if (filterFlightKeyword) {
      flightData = flightData.filter(
        (item) =>
          item.bookingRef
            .toLowerCase()
            .indexOf(filterFlightKeyword.toLowerCase()) !== -1 ||
          (item.departureCity &&
            item.departureCity
              .toLowerCase()
              .indexOf(filterFlightKeyword.toLowerCase()) !== -1) ||
          (item.arrivalCity &&
            item.arrivalCity
              .toLowerCase()
              .indexOf(filterFlightKeyword.toLowerCase()) !== -1) ||
          item.passengers.some(
            (passenger) =>
              passenger
                .toLowerCase()
                .indexOf(filterFlightKeyword.toLowerCase()) !== -1
          )
      );
    }

    if (filterFlightStatus) {
      flightData = flightData.filter(
        (item) => item.ticketingAgreementOption === filterFlightStatus
      );
    }

    if (filterFlightDepartureDate) {
      flightData = flightData.filter(
        (item) =>
          new Date(item.departureDate).toLocaleDateString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }) ===
          new Date(filterFlightDepartureDate).toLocaleDateString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
      );
    }

    if (filterFlightReturnDate) {
      flightData = flightData.filter(
        (item) =>
          new Date(item.returnDate).toLocaleDateString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }) ===
          new Date(filterFlightReturnDate).toLocaleDateString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
      );
    }

    return flightData;
  };

  const applySortFilterForHotelsBookings = ({
    hotelData,
    comparator,
    filterHotelKeyword,
    filterCheckInDate,
    filterCheckOutDate,
  }) => {
    const stabilizedThis = hotelData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    hotelData = stabilizedThis.map((el) => el[0]);

    if (filterHotelKeyword) {
      hotelData = hotelData.filter(
        (item) =>
          item.bookingRef
            .toLowerCase()
            .indexOf(filterHotelKeyword.toLowerCase()) !== -1 ||
          (item.city &&
            item.city
              .toLowerCase()
              .indexOf(filterHotelKeyword.toLowerCase()) !== -1) ||
          (item.hotelName &&
            item.hotelName
              .toLowerCase()
              .indexOf(filterHotelKeyword.toLowerCase()) !== -1) ||
          item.guests.some(
            (guest) =>
              guest.toLowerCase().indexOf(filterHotelKeyword.toLowerCase()) !==
              -1
          )
      );
    }

    if (filterCheckInDate) {
      hotelData = hotelData.filter(
        (item) =>
          new Date(item.checkInDate).toLocaleDateString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }) ===
          new Date(filterCheckInDate).toLocaleDateString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
      );
    }

    if (filterCheckOutDate) {
      hotelData = hotelData.filter(
        (item) =>
          new Date(item.checkOutDate).toLocaleDateString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }) ===
          new Date(filterCheckOutDate).toLocaleDateString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
      );
    }

    return hotelData;
  };

  const flightDataFiltered = applySortFilterForFlightsBookings({
    flightData,
    comparator: getComparator(order, orderBy),
    filterFlightKeyword,
    filterFlightStatus,
    filterFlightDepartureDate,
    filterFlightReturnDate,
  });

  const hotelDataFiltered = applySortFilterForHotelsBookings({
    hotelData,
    comparator: getComparator(order, orderBy),
    filterHotelKeyword,
    filterCheckInDate,
    filterCheckOutDate,
  });

  // Functions for Flights Bookings
  const handleFilterFlightKeyword = (filterFlightKeyword) => {
    setFilterFlightKeyword(filterFlightKeyword);
    setPage(0);
  };

  const handleDeleteFlightRow = (bookingRef) => {
    dispatch(deleteFlightBooking(bookingRef));
  };

  const handleViewFlightRow = (bookingRef) => {
    push(`${PAGE_PATH.BOOKINGS_FLIGHTS}${bookingRef}`);
  };

  const handleFilterFlightStatus = (event) => {
    setFilterFlightStatus(event.target.value);
  };

  const handleClearAllForFlightsBookings = () => {
    setFilterDepartureDate(null);
    setFilterReturnDate(null);
    setFilterFlightKeyword("");
  };

  // Functions for Hotels Bookings
  const handleFilterHotelKeyword = (filterHotelKeyword) => {
    setFilterHotelKeyword(filterHotelKeyword);
    setPage(0);
  };

  const handleDeleteHotelRow = (bookingRef) => {
    dispatch(deleteHotelBooking(bookingRef));
  };

  const handleViewHotelRow = (bookingRef) => {
    push(`${PAGE_PATH.BOOKINGS_HOTELS}${bookingRef}`);
  };

  const handleClearAllForHotelsBookings = () => {
    setFilterCheckInDate(null);
    setFilterCheckOutDate(null);
    setFilterHotelKeyword("");
  };

  // TODO: Check with an experienced dev
  // To Download File - Opens up in new tab
  const downloadFile = (downloadUrl, fileName) => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    link.target = "_blank";
    link.click();
  };

  return (
    <DashboardLayout>
      <Page title="Bookings">
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading="Bookings"
            action={
              <NextLink
                href={`${PAGE_PATH.BOOK}?currentTab=${
                  (filterStatus === "flights" && "Flights") ||
                  (filterStatus === "hotels" && "Hotels")
                }`}
                passHref
              >
                <Button
                  variant="contained"
                  startIcon={<Iconify icon={"eva:plus-fill"} />}
                >
                  Book More{" "}
                  {(filterStatus === "flights" && "flights") ||
                    (filterStatus === "hotels" && "hotels")}
                </Button>
              </NextLink>
            }
          />
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2 }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <div>{tab.label}</div>{" "}
                    <Label color={tab.color}> {tab.count} </Label>
                  </Stack>
                }
              />
            ))}
          </Tabs>

          <Divider />

          {filterStatus === "flights" && (
            <FlightsBookingsTableToolbar
              tableDataCount={flightDataFiltered.length}
              filterKeyword={filterFlightKeyword}
              filterStatus={filterFlightStatus}
              filterDepartureDate={filterFlightDepartureDate}
              filterReturnDate={filterFlightReturnDate}
              onFilterName={handleFilterFlightKeyword}
              onFilterStatus={handleFilterFlightStatus}
              onFilterDepartureDate={(newValue) =>
                setFilterDepartureDate(newValue)
              }
              onFilterReturnDate={(newValue) => setFilterReturnDate(newValue)}
              optionsStatus={Object.values(TICKETING_AGREEMENT_OPTION_TYPE)}
              onClearDepartureDate={() => setFilterDepartureDate(null)}
              onClearReturnDate={() => setFilterReturnDate(null)}
              onClearKeyword={() => setFilterFlightKeyword("")}
              onClearAll={handleClearAllForFlightsBookings}
            />
          )}

          {filterStatus === "hotels" && (
            <HotelsBookingsTableToolbar
              tableDataCount={hotelDataFiltered.length}
              filterKeyword={filterHotelKeyword}
              filterCheckInDate={filterCheckInDate}
              filterCheckOutDate={filterCheckOutDate}
              onFilterName={handleFilterHotelKeyword}
              onfilterCheckInDate={(newValue) => setFilterCheckInDate(newValue)}
              onfilterCheckOutDate={(newValue) =>
                setFilterCheckOutDate(newValue)
              }
              onClearCheckInDate={() => setFilterCheckInDate(null)}
              onClearCheckOutDate={() => setFilterCheckOutDate(null)}
              onClearKeyword={() => setFilterHotelKeyword("")}
              onClearAll={handleClearAllForHotelsBookings}
            />
          )}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: "relative" }}>
              <Table size={dense ? "small" : "medium"}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={
                    (filterStatus === "flights" && FLIGHTS_TABLE_HEAD) ||
                    (filterStatus === "hotels" && HOTELS_TABLE_HEAD)
                  }
                  rowCount={
                    (filterStatus === "flights" && flightData.length) ||
                    (filterStatus === "hotels" && hotelData.length)
                  }
                  onSort={onSort}
                />

                {filterStatus === "flights" &&
                  flightLoadingState === LOADING_STATES.LOADING && (
                    <TableBody>
                      <FlightsBookingsTableRowSkeleton />
                    </TableBody>
                  )}

                {filterStatus === "hotels" &&
                  hotelLoadingState === LOADING_STATES.LOADING && (
                    <TableBody>
                      <HotelsBookingsTableRowSkeleton />
                    </TableBody>
                  )}

                {filterStatus === "flights" &&
                  (flightLoadingState === LOADING_STATES.NO_RESULTS ||
                    !flightDataFiltered.length) && <TableSearchNotFound />}
                {filterStatus === "hotels" &&
                  (hotelLoadingState === LOADING_STATES.NO_RESULTS ||
                    !hotelDataFiltered.length) && <TableSearchNotFound />}

                {flightLoadingState === LOADING_STATES.LOADED &&
                  hotelLoadingState === LOADING_STATES.LOADED && (
                    <TableBody>
                      {filterStatus === "flights" &&
                        flightDataFiltered
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => (
                            <FlightsBookingsTableRow
                              key={row.bookingRef}
                              row={row}
                              onViewRow={() =>
                                handleViewFlightRow(row.bookingRef)
                              }
                              actions={
                                <>
                                  <MenuItem
                                    onClick={() =>
                                      handleViewFlightRow(row.bookingRef)
                                    }
                                  >
                                    <Iconify icon={"eva:eye-fill"} />
                                    View
                                  </MenuItem>
                                  <MenuItem
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      downloadFile(
                                        row?.download?.downloadURL,
                                        row?.download?.fileName
                                      );
                                    }}
                                  >
                                    <Iconify icon={"eva:printer-outline"} />
                                    Print
                                  </MenuItem>
                                  <Divider />
                                  <MenuItem
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      dispatch(
                                        setAndShowDeleteDialog(
                                          row.bookingRef,
                                          () =>
                                            handleDeleteFlightRow(
                                              row.bookingRef
                                            )
                                        )
                                      );
                                    }}
                                    sx={{ color: "error.main" }}
                                  >
                                    <Iconify icon={"eva:trash-2-outline"} />
                                    Delete
                                  </MenuItem>
                                </>
                              }
                            />
                          ))}
                      {filterStatus === "hotels" &&
                        hotelDataFiltered
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => (
                            <HotelsBookingsTableRow
                              key={row.bookingRef}
                              row={row}
                              onViewRow={() =>
                                handleViewHotelRow(row.bookingRef)
                              }
                              actions={
                                <>
                                  <MenuItem
                                    onClick={() =>
                                      handleViewHotelRow(row.bookingRef)
                                    }
                                  >
                                    <Iconify icon={"eva:eye-fill"} />
                                    View
                                  </MenuItem>
                                  <MenuItem
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      downloadFile(
                                        row?.download?.downloadURL,
                                        row?.download?.fileName
                                      );
                                    }}
                                  >
                                    <Iconify icon={"eva:printer-outline"} />
                                    Print
                                  </MenuItem>
                                  <Divider />
                                  <MenuItem
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      dispatch(
                                        setAndShowDeleteDialog(
                                          row.bookingRef,
                                          () =>
                                            handleDeleteHotelRow(row.bookingRef)
                                        )
                                      );
                                    }}
                                    sx={{ color: "error.main" }}
                                  >
                                    <Iconify icon={"eva:trash-2-outline"} />
                                    Delete
                                  </MenuItem>
                                </>
                              }
                            />
                          ))}

                      {filterStatus === "flights" && (
                        <TableEmptyRows
                          height={dense ? 56 : 76}
                          emptyRows={emptyRows(
                            page,
                            rowsPerPage,
                            flightData.length
                          )}
                        />
                      )}
                      {filterStatus === "hotels" && (
                        <TableEmptyRows
                          height={dense ? 56 : 76}
                          emptyRows={emptyRows(
                            page,
                            rowsPerPage,
                            hotelData.length
                          )}
                        />
                      )}
                    </TableBody>
                  )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: "relative" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={
                (filterStatus === "flights" && flightDataFiltered.length) ||
                (filterStatus === "hotels" && hotelDataFiltered.length)
              }
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: "absolute" } }}
            />
          </Box>
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default Bookings;
