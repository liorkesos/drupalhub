<?php

$plugin = array(
  'label' => t('Update'),
  'description' => t('Restuling user.'),
  'resource' => 'users',
  'class' => 'DrupalHubUsers',
  'name' => 'update__1_0',
  'entity_type' => 'user',
  'bundle' => 'user',
  'hook_menu' => TRUE,
  'authentication_types' => TRUE,
  'authentication_optional' => TRUE,
  'render_cache' => array(
    'render' => FALSE,
  ),
);
