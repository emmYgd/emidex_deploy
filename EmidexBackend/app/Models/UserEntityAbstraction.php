<?php

namespace App\Models;

/*use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;*/
use Illuminate\Database\Eloquent\Model;
/*use Laravel\Lumen\Auth\Authorizable;*/

class UserEntityAbstraction extends Model /*implements AuthenticatableContract, AuthorizableContract*/
{
    //use Authenticatable, Authorizable, HasFactory;
    protected $table = 'user_entity';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        
        'shiperFullName', 'shiperAddress', 'receiverFullName', 'receiverAddress', 
        'orgName', 'userMail', 'userPhone', 'commodity', 'commodityTypes', 
        'commodityQuantity', 'commodityContent', 'destination', 'origin', 'portOrigin', 
        'weight_kgs', 'weight_cubic','allocation', 'service_type', 'size_type', 'add_info', 
        'payment_details', 'price_details', 'quoteRefCode'
        
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    public function admin_abstraction(){
        $this->belongsTo(AdminAbstraction::class);
    }
}