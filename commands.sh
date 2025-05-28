# Create main project directory
mkdir shubupad-backend
cd shubupad-backend

# Create main source structure
mkdir -p src/{controllers,services,models,routes,middleware,validators,types,utils,config,database,jobs,tasks,integrations,events,security}

# Create database subdirectories
mkdir -p src/database/{migrations,seeds,repositories}

# Create integration subdirectories
mkdir -p src/integrations/{stripe,aws,elasticsearch,analytics}

# Create test structure
mkdir -p tests/{unit,integration,e2e,fixtures,helpers,setup}
mkdir -p tests/unit/{controllers,services,models,utils,validators}
mkdir -p tests/fixtures/test-images

# Create docs structure
mkdir -p docs/{api,database,deployment,development}

# Create scripts directory
mkdir scripts

# Create docker directory
mkdir docker

# Create infrastructure directories
mkdir -p infrastructure/{terraform,k8s}
mkdir -p infrastructure/terraform/modules/{database,redis,s3,cloudfront}

# Create monitoring directories
mkdir -p monitoring/{prometheus,grafana,logs}
mkdir -p monitoring/grafana/dashboards

# Create all controller files
touch src/controllers/{auth.controller.ts,user.controller.ts,recipe.controller.ts,collection.controller.ts,rating.controller.ts,search.controller.ts,mealplan.controller.ts,subscription.controller.ts,social.controller.ts,trending.controller.ts}

# Create all service files
touch src/services/{auth.service.ts,user.service.ts,recipe.service.ts,collection.service.ts,rating.service.ts,search.service.ts,recommendation.service.ts,mealplan.service.ts,notification.service.ts,payment.service.ts,upload.service.ts,email.service.ts,analytics.service.ts,cache.service.ts}

# Create all model files
touch src/models/{User.ts,Recipe.ts,Collection.ts,Rating.ts,Review.ts,MealPlan.ts,Subscription.ts,Category.ts,Ingredient.ts,Notification.ts,UserFollow.ts,RecipeImage.ts,AuditLog.ts}

# Create all route files
touch src/routes/{index.ts,auth.routes.ts,users.routes.ts,recipes.routes.ts,collections.routes.ts,ratings.routes.ts,search.routes.ts,mealplans.routes.ts,subscriptions.routes.ts,social.routes.ts,trending.routes.ts,admin.routes.ts,health.routes.ts}

# Create all middleware files
touch src/middleware/{auth.middleware.ts,validation.middleware.ts,rate-limit.middleware.ts,cors.middleware.ts,error.middleware.ts,logging.middleware.ts,premium.middleware.ts,upload.middleware.ts,cache.middleware.ts,security.middleware.ts}

# Create all validator files
touch src/validators/{auth.validator.ts,user.validator.ts,recipe.validator.ts,collection.validator.ts,rating.validator.ts,search.validator.ts,mealplan.validator.ts,common.validator.ts}

# Create all type definition files
touch src/types/{auth.types.ts,user.types.ts,recipe.types.ts,collection.types.ts,rating.types.ts,search.types.ts,mealplan.types.ts,subscription.types.ts,response.types.ts,database.types.ts,index.ts}

# Create all utility files
touch src/utils/{database.util.ts,jwt.util.ts,password.util.ts,upload.util.ts,email.util.ts,validation.util.ts,pagination.util.ts,search.util.ts,logger.util.ts,cache.util.ts,image.util.ts,constants.ts}

# Create all config files
touch src/config/{database.config.ts,redis.config.ts,email.config.ts,upload.config.ts,payment.config.ts,jwt.config.ts,rate-limit.config.ts,index.ts}

# Create database files
touch src/database/connection.ts
touch src/database/migrations/{001_create_users_table.ts,002_create_recipes_table.ts,003_create_collections_table.ts,004_create_ratings_table.ts,005_create_reviews_table.ts,006_create_mealplans_table.ts,007_create_subscriptions_table.ts,008_create_categories_table.ts,009_create_ingredients_table.ts,010_create_user_follows_table.ts,011_create_notifications_table.ts,012_create_recipe_images_table.ts,013_create_audit_logs_table.ts,014_create_indexes.ts}
touch src/database/seeds/{categories.seed.ts,ingredients.seed.ts,recipes.seed.ts,admin-user.seed.ts}
touch src/database/repositories/{user.repository.ts,recipe.repository.ts,collection.repository.ts,rating.repository.ts,review.repository.ts,mealplan.repository.ts,subscription.repository.ts,category.repository.ts,ingredient.repository.ts,notification.repository.ts,base.repository.ts}

# Create job files
touch src/jobs/{queue.ts,email.job.ts,image-processing.job.ts,trending-calculation.job.ts,recommendation-update.job.ts,cleanup.job.ts,analytics.job.ts}

# Create task files
touch src/tasks/{scheduler.ts,backup.task.ts,metrics.task.ts,cache-warming.task.ts,data-cleanup.task.ts}

# Create integration files
touch src/integrations/stripe/{stripe.service.ts,webhook.handler.ts,types.ts}
touch src/integrations/aws/{s3.service.ts,ses.service.ts,cloudfront.service.ts}
touch src/integrations/elasticsearch/{client.ts,indexing.service.ts,search.service.ts}
touch src/integrations/analytics/{mixpanel.service.ts,google-analytics.service.ts}

# Create event files
touch src/events/{event-emitter.ts,user.events.ts,recipe.events.ts,rating.events.ts,subscription.events.ts}

# Create security files
touch src/security/{encryption.util.ts,sanitization.util.ts,csrf.util.ts,xss-protection.util.ts}

# Create main app files
touch src/app.ts
touch server.ts

# Create test files
touch tests/integration/{auth.test.ts,recipes.test.ts,search.test.ts,collections.test.ts,ratings.test.ts,mealplans.test.ts}
touch tests/e2e/{user-journey.test.ts,recipe-workflow.test.ts,payment-flow.test.ts}
touch tests/fixtures/{users.json,recipes.json}
touch tests/helpers/{database.helper.ts,auth.helper.ts,mock-data.helper.ts}
touch tests/setup/{jest.config.js,test-db.setup.ts,global-teardown.ts}

# Create documentation files
touch docs/api/{auth.md,recipes.md,search.md,collections.md,ratings.md,mealplans.md,subscriptions.md,webhooks.md}
touch docs/database/{schema.md,relationships.md,migrations.md}
touch docs/deployment/{docker.md,aws.md,monitoring.md}
touch docs/development/{setup.md,coding-standards.md,testing.md}

# Create script files
touch scripts/{build.sh,deploy.sh,migrate.sh,seed.sh,backup.sh,health-check.sh}

# Create docker files
touch docker/{Dockerfile,docker-compose.yml,docker-compose.prod.yml,nginx.conf}

# Create infrastructure files
touch infrastructure/terraform/{main.tf,variables.tf,outputs.tf}
touch infrastructure/k8s/{deployment.yaml,service.yaml,ingress.yaml,configmap.yaml}

# Create monitoring files
touch monitoring/prometheus/prometheus.yml
touch monitoring/logs/logstash.conf

# Create root config files
touch {.env.example,.env.test,.gitignore,.eslintrc.js,.prettierrc,package.json,tsconfig.json,jest.config.js,nodemon.json,README.md,CHANGELOG.md,swagger.json}

# Make scripts executable
chmod +x scripts/*.sh

echo "✅ ShubUpad backend project structure created successfully!"
echo "📁 Total files created: 150+"
echo "🚀 Ready to start development!"