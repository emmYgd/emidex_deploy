<?php

namespace App\Models;

use App\Model\UserAbstraction;

/*use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;*/
use Illuminate\Database\Eloquent\Model;
/*use Laravel\Lumen\Auth\Authorizable;*/

class AdminAbstraction extends Model /*implements AuthenticatableContract, AuthorizableContract*/
{
    //use Authenticatable, Authorizable, HasFactory;
    protected $table = 'admin';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'admin_name', 'role'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'secret_token'
    ];

    public function user_abstractions(){
        $this->hasMany(UserAbstraction::class);
    }

     public function user_entity_abstractions(){
        $this->hasMany(UserEntityAbstraction::class);
    }
}
