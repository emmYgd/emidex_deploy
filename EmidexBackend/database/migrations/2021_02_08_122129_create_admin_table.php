<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('admin')) {

            Schema::create('admin', function (Blueprint $table) {
            
                $table->id();

                $table->string('user_abstraction_id')->nullable();
                $table->string('user_entity_abstration_id')->nullable();

                $table->string('role');

                $table->enum('admin_name', [env('ADMIN_USERNAME')])->unique();
                $table->enum('password', [env('ADMIN_PASSWORD')])->unique();
                //$table->enum('secret_token', [env('BEARER_TOKEN')])->unique();

                $table->timestamps();

            });
        }else{return;}
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admin');
    }
}
