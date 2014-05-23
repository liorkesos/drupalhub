<?php

$plugin = array(
  'title' => t('New question'),
  'description' => t('News question plugin.'),
  'category' => t('DrupalHub questions'),
);

function drupalhub_questions_new_question_content_type_render($subtype, $conf, $args, $context) {

  $block = new stdClass();
  $block->title = '';
  $question_link = drupalhub_core_modal_window(array(
    'text' => t('Post a question!'),
    'href' => 'drupalhub_questions/create',
    'class' => 'create-question',
    'modal_settings' => array(
      'modalSize' => array(
        'type' => 'fixed',
        'width' => 1000,
        'height' => 600,
        'addWidth' => 10,
        'addHeight' => 10,
        'contentRight' => 0,
        'contentBottom' => 0,
      ),
      'modalOptions' => array('opacity' => .6),
      'animation' => 'fadeIn',
    ),
  ));

  $block->content = "<div class='new new-question'><i class='fa fa-plus'></i>" . $question_link . '</div>';
  return $block;
}

/**
 * Form settings.
 */
function drupalhub_questions_new_question_content_type_edit_form($form, &$form_state) {
  return $form;
}

/**
 * Submitting the form and save the value of the form elements.
 */
function drupalhub_questions_new_question_content_type_edit_form_submit(&$form, &$form_state) {
  foreach (array_keys($form_state['values']) as $key) {
    $form_state['conf'][$key] = $form_state['values'][$key];
  }
}
