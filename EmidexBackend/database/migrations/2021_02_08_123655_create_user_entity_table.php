<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserEntityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_entity', function (Blueprint $table) {

          $table->id();

          $table->string('admin_abstraction_id')->nullable();

          $table->string('shiperFullName');
          $table->string('shiperAddress');

          $table->string('receiverFullName');
          $table->string('receiverAddress');

          $table->string('orgName');
          $table->string('userMail');
          $table->string('userPhone');

          $table->string('commodity');
          $table->string('commodityTypes');
          $table->integer('commodityQuantity');
          $table->string('commodityContent');

          $table->string('destination');
          $table->string('origin');
          $table->string('portOrigin');

          $table->string('weight_kgs');
          $table->string('weight_cubic');
          $table->string('allocation');

          $table->string('service_type');
          $table->string('size_type');
          $table->string('add_info')->nullable();

          $table->string('price_details')->nullable();
          $table->string('payment_details')->nullable();
          $table->string('quoteRefCode')->nullable();

          $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */

    public function down()
    {
        Schema::dropIfExists('user_entity');
    }
}
