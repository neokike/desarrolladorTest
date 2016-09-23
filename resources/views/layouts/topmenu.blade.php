<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="index.html">OceanGroup</a>
    </div>
    <!-- Sidebar -->
    <div class="collapse navbar-collapse navbar-ex1-collapse">
        <ul class="nav navbar-nav side-nav">
            <li>
                <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i class="fa fa-fw fa-users"></i>
                    Tarea Nº1 CRUD <i class="fa fa-fw fa-caret-down pull-right dropdown-caret"></i></a>
                <ul id="demo" class="collapse">
                    <li ui-sref-active="active">
                        <a ui-sref="trabajadores.listar">Listar Trabajadores</a>
                    </li>
                    <li ui-sref-active="active">
                        <a ui-sref="trabajadores.nuevo" href="#">Nuevo Trabajador</a>
                    </li>
                </ul>
            </li>
            <li ui-sref-active="active">
                <a ui-sref="arbol"><i class="fa fa-fw fa-th-list"></i> Tarea Nº2 Árbol</a>
            </li>
        </ul>
    </div>
</nav>
