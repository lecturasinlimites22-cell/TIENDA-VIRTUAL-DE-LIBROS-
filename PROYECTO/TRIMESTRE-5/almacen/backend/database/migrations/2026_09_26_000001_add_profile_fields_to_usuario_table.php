<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('usuario', function (Blueprint $table) {
            if (! Schema::hasColumn('usuario', 'nombre')) {
                $table->string('nombre', 100)->nullable();
            }
            if (! Schema::hasColumn('usuario', 'telefono')) {
                $table->string('telefono', 15)->nullable();
            }
            if (! Schema::hasColumn('usuario', 'direccion')) {
                $table->string('direccion', 150)->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('usuario', function (Blueprint $table) {
            $columns = array_filter(['nombre', 'telefono', 'direccion'], fn ($column) => Schema::hasColumn('usuario', $column));
            if ($columns) {
                $table->dropColumn($columns);
            }
        });
    }
};