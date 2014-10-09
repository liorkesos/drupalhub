<?php

$plugin = array(
  'title' => t('Links'),
  'description' => t('Links for the wiki page.'),
  'category' => t('DrupalHub wiki'),
);

function drupalhub_wiki_links_content_type_render($subtype, $conf, $args, $context) {
  $block = new stdClass();
  $block->title = '';
  $block->content = drupalhub_wiki_links();
  return $block;
}

/**
 * Form settings.
 */
function drupalhub_wiki_links_content_type_edit_form($form, &$form_state) {
  return $form;
}

/**
 * Submitting the form and save the value of the form elements.
 */
function drupalhub_wiki_links_box_content_type_edit_form_submit(&$form, &$form_state) {
  foreach (array_keys($form_state['values']) as $key) {
    $form_state['conf'][$key] = $form_state['values'][$key];
  }
}
