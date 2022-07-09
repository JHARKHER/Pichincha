// import React from "react";
// import { connect } from "react-redux";
// import Paper from "@material-ui/core/Paper";//contenedor de la forma
// import {
//   SelectionState,
//   PagingState,
//   IntegratedPaging,
//   SortingState,
//   IntegratedSorting,
//   FilteringState,
//   IntegratedFiltering
// } from "@devexpress/dx-react-grid";

// import {
//   Grid,
//   Table,
//   TableHeaderRow,
//   TableSelection,
//   PagingPanel,
//   TableFilterRow,
//   TableColumnResizing
// } from "@devexpress/dx-react-grid-material-ui";

// import { 
//   pagingPanelMessages,
//   tableMessages,
//   filterRowMessages,
//   DateTypeProvider } from "odc-common"; // Se utiliza para el frid y presenta en formato de si o no, y tambien ayuda en la paginacion



// class GrdCampaniaEspecial extends React.PureComponent {
//   constructor(props) { //constructor de ciclo de vida de react, inicializacion de variables
//     super(props);

//     this.state = {
//       columns: [
//         { name: "idCabeceraArchivo", title: "No." },
//         { name: "descripcion", title: "Nombre Carga" },
//         { name: "nombreArchivo", title: "Archivo" }, 
//         { name: "fechaCarga", title: "Fecha Carga" },
//         { name: "estado", title: "Estado" },
//         { name: "registroArchivo", title: "R. Archivo" },
//         { name: "registroError", title: "R. Erroneos" },
//         { name: "registroClienteDuplicado", title: "R. Duplicados" },
//         { name: "registroCargado", title: "R. Cargados" },
//       ],
//       columnWidths: [
//         { columnName: "idCabeceraArchivo", width: 100 },
//         { columnName: "descripcion", width: 300 },
//         { columnName: "nombreArchivo", width: 300 },
//         { columnName: "fechaCarga", width: 200 },
//         { columnName: "estado", width: 200 },
//         { columnName: "registroArchivo", width: 150 },
//         { columnName: "registroError", width: 150 },
//         { columnName: "registroClienteDuplicado", width: 150 },
//         { columnName: "registroCargado", width: 150 }
//       ],
//       sorting: [{ columnName: "descripcion", direction: "asc" }], //que columnas va a ordenar
//       defaultSorting: [{ columnName: "descripcion" }],
//       dateColumns:["fechaCarga"],
//       filters: [],
//       currentPage: 0,
//       pageSize: 10,
//       pageSizes: [5, 10, 15]
//     };

//     ///Esto nunca cambiar
//     this.changeSorting = sorting => this.setState({ sorting });
//     this.changeCurrentPage = currentPage => this.setState({ currentPage });
//     this.changePageSize = pageSize => this.setState({ pageSize });
//     this.changeFilters = filters => this.setState({ filters });
//     this.changeColumnWidths = columnWidths => this.setState({ columnWidths });
//     /////
//   }
//   render() {
//     const { selection, changeSelection, rowsCampaniaEspecial } = this.props; // son funciones que viene del index, el container devuelve este valor, rows se encuentra en los reducers
//     const {
//       columns,
//       pageSize,
//       pageSizes,
//       currentPage,
//       defaultSorting,
//       filters,
//       columnWidths,
//       dateColumns,
//     } = this.state;/// esto viene de la definicion del grid
//     return (
//      <Paper>
//         <Grid rows={rowsCampaniaEspecial} columns={columns}>
//           <FilteringState
//             filters={filters}
//             onFiltersChange={this.changeFilters}
//           />
//           <IntegratedFiltering />

//           <SortingState
//             defaultSorting={defaultSorting}
//             onSortingChange={this.changeSorting}
//           />
//           <IntegratedSorting />
//           <SelectionState
//             selection={selection}
//             onSelectionChange={changeSelection}
//           />
//            {/* DateTypeProvider interpreta el formato de columna  */}
//            <DateTypeProvider for={dateColumns} />  
//           <PagingState
//             currentPage={currentPage}
//             onCurrentPageChange={this.changeCurrentPage}
//             pageSize={pageSize}
//             onPageSizeChange={this.changePageSize}
//           />
//           <IntegratedPaging />
//           <Table messages={tableMessages} />
//           <TableColumnResizing
//             columnWidths={columnWidths}
//             onColumnWidthsChange={this.changeColumnWidths}
//           />
//           <TableHeaderRow showSortingControls />
//           <TableFilterRow messages={filterRowMessages} />
//           <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages} />
//           <TableSelection
//             selectByRowClick
//             highlightRow
//             showSelectionColumn={false}
//           />
//         </Grid>
//       </Paper>
//     );
//   }
// }

// const mapStateToProps = ({ campania }) => { //aqui se conecta el grid con el reducer
  
//   const { rowsCampaniaEspecial } = campania.campaniaespecial;  /// Saca del storage el estado y le asigna a la variable rows
//   return { rowsCampaniaEspecial };
// };

// GrdCampaniaEspecial = connect( ///Aqui ya se tiene la variables del mapStateToProps
//   mapStateToProps,
//   {} //va en blanco porque no se recibe ninguna accion
// )(GrdCampaniaEspecial);

// export default GrdCampaniaEspecial;
