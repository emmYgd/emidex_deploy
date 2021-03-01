<?php

namespace App\Models;

use App\Models\AdminAbstraction;

/*use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;*/
use Illuminate\Database\Eloquent\Model;
/*use Laravel\Lumen\Auth\Authorizable;*/

class UserAbstraction extends Model /*implements AuthenticatableContract, AuthorizableContract*/
{
    //use Authenticatable, Authorizable, HasFactory;
    protected $table = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        
        'shipmentDay', 'shipmentMonth', 'shipmentYear', 'shipmentHour', 'shipmentMinute', 'shipmentSecond', 'deliveryDay', 'deliveryMonth', 'deliveryYear', 'shiperFullName', 'shiperAddress', 'receiverFullName', 'receiverAddress', 'price', 'status', 'commodity', 'commodityTypes','commodityQuantity', 'commodityContent', 'destination', 'origin', 'portOrigin', 'mode', 'weight_kgs', 'weight_cubic', 'allocation', 'service_type', 'size_type', 'add_info', 'shipmentTravelHistory', 'trackingCode', 'referenceCode'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function admin_abstraction(){
        $this->belongsTo(AdminAbstraction::class);
    }
}
