<?php namespace Neonbug\Translation\Providers;

use App;
use Route;
use View;
use Config;
use \Illuminate\Routing\Router as Router;

class ServiceProvider extends \Neonbug\Common\Providers\BaseServiceProvider {
	
	const PACKAGE_NAME     = 'translation';
	const PREFIX           = 'translation';
	const ROLE             = 'translation';
	const ADMIN_CONTROLLER = '\Neonbug\Translation\Controllers\AdminController';
	
	/**
	 * Define your route model bindings, pattern filters, etc.
	 *
	 * @return  void
	 */
	public function boot()
	{
		//============
		//== ASSETS ==
		//============
		$this->loadViewsFrom(__DIR__.'/../resources/views', static::PACKAGE_NAME);
		$this->publishes([
			__DIR__.'/../resources/views' => base_path('resources/views/vendor/' . static::PACKAGE_NAME),
		]);
		
		$this->loadViewsFrom(__DIR__.'/../resources/admin_views', static::PACKAGE_NAME . '_admin');
		$this->publishesAdmin([
			__DIR__.'/../resources/admin_views' => base_path('resources/views/vendor/' . static::PACKAGE_NAME . '_admin'),
		]);
		
		$this->loadTranslationsFrom('/', static::PACKAGE_NAME);
		
		$this->publishes([
			__DIR__.'/../assets/' => public_path('vendor/translation'),
		], 'public');
		
		$this->publishes([
			__DIR__.'/../database/migrations/' => database_path('/migrations')
		], 'migrations');
		
		$this->publishes([
			__DIR__.'/../config/' . static::PACKAGE_NAME . '.php' => config_path('neonbug/' . static::PACKAGE_NAME . '.php'),
		]);
		
		//============
		//== ROUTES ==
		//============
		$language = App::make('Language');
		$locale = ($language == null ? Config::get('app.default_locale') : $language->locale);
		
		$admin_language = App::make('AdminLanguage');
		$admin_locale = ($admin_language == null ? Config::get('app.admin_default_locale') : $admin_language->locale);
		
		$resource_repo = App::make('ResourceRepository');
		
		//admin
		Route::group([ 'prefix' => $admin_locale . '/admin/' . static::PREFIX, 
			'middleware' => [ 'auth.admin', 'admin.menu' ], 'role' => static::ROLE, 
			'menu.icon' => 'world', 'weight' => 6 ], function($router)
		{
			$router->get('list', [
				'as'   => static::PREFIX . '::admin::list', 
				'uses' => static::ADMIN_CONTROLLER . '@adminList'
			]);
			
			$router->get('edit/{id}', [
				'as'   => static::PREFIX . '::admin::edit', 
				'uses' => static::ADMIN_CONTROLLER . '@adminEdit'
			]);
			$router->post('edit/{id}', [
				'as'   => static::PREFIX . '::admin::edit-save', 
				'uses' => static::ADMIN_CONTROLLER . '@adminEditPost'
			]);
		});

		Route::group([ 'prefix' => $admin_locale . '/admin/' . static::PREFIX, 'middleware' => [ 'auth.admin' ], 
			'role' => static::ROLE ], function($router)
		{
			$router->post('delete', [
				'as'   => static::PREFIX . '::admin::delete', 
				'uses' => static::ADMIN_CONTROLLER . '@adminDeletePost'
			]);
		});

		parent::boot();
	}

	/**
	 * Register any application services.
	 *
	 * This service provider is a great spot to register your various container
	 * bindings with the application. As you can see, we are registering our
	 * "Registrar" implementation here. You can add your own bindings too!
	 *
	 * @return  void
	 */
	public function register()
	{
		//===========
		//== BINDS ==
		//===========
		if (!App::bound('\Neonbug\Translation\Repositories\TranslationRepository'))
		{
			App::singleton('\Neonbug\Translation\Repositories\TranslationRepository', '\Neonbug\Translation\Repositories\TranslationRepository');
		}
	}

}
